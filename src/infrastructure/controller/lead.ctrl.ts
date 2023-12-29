import { Request, Response } from "express";
import { LeadCreate } from "../../application/lead.create";
import jwt from "jsonwebtoken";
class LeadCtrl {
  constructor(private readonly leadCreator: LeadCreate) { }

  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { message, phone, imagen } = body;
    const response = await this.leadCreator.sendMessageAndSave({ message, phone, imagen })
    res.send(response);
  };

  public sendWhitTokenCtrl = async (req: Request, res: Response) => {
    const { message, phone, imagen } = req.body;
    const token = req.headers['authorization'];

    try {
      if (token) {
        // Verificar si el token es válido
        const decodedToken = jwt.verify(token, 'tu_clave_secreta');

        // Acceder a la información decodificada del token si es necesario
        const { /* datos que están incluidos en el token */ } = decodedToken;

        // Realizar la lógica una vez que el token ha sido verificado correctamente
        const response = await this.leadCreator.sendMessageAndSave({ message, phone, imagen });
        res.send(response);
      } else {
        // Si no hay token en la solicitud
        return res.status(401).send('Token not provided');
      }
    } catch (error) {
      // Si hay un error al verificar el token
      console.error('Error verifying token:', error);
      return res.status(401).send('Unauthorized');
    }
  };


  public obtenerTokenCtrl = async (req: Request, res: Response) => {
    try {
      // Aquí deberías verificar las credenciales del usuario y autenticarlo
      // Si el usuario es válido, genera un token JWT
      const token = jwt.sign({ /* datos que quieras incluir en el token */ }, "tu_clave_secreta", { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error al generar el token" });
    }
  };
}

export default LeadCtrl;
