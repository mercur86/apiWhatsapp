import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
import LeadExternal from "../../domain/lead-external.repository";

class WsTransporter extends Client implements LeadExternal {
  private status = false;

  constructor() {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: [
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
        ],
      },
    });

    console.log("Iniciando....");

    this.initialize();

    this.on("ready", () => {
      this.status = true;
      console.log("LOGIN_SUCCESS");
    });

    this.on("auth_failure", () => {
      this.status = false;
      console.log("LOGIN_FAIL");
    });

    this.on("qr", (qr) => {
      console.log("Escanea el código QR que está en la carpeta tmp");
      this.generateImage(qr);
    });
  }

  async sendMsg(lead: { message: string; phone: string; imagen?: string }): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });

      const { message, phone, imagen } = lead;
      let media: MessageMedia | undefined = undefined;
      console.log(imagen);
      if (imagen) {
        media = await MessageMedia.fromUrl(imagen);
      }

      const response = await this.sendMessage(`${phone}@c.us`, message, {
        media,
      });

      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  getStatus(): boolean {
    return this.status;
  }

  private generateImage = (base64: string) => {
    //const path = `${process.cwd()}/tmp`;
    const basePath = 'tmp'; //para produccion 
    console.log('ruta temp '+basePath);
    let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
    qr_svg.pipe(require("fs").createWriteStream(`${basePath}/qr.svg`));
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR ⚡`);
  };
}

export default WsTransporter;
