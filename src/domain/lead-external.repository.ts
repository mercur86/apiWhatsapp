export default interface LeadExternal {
    sendMsg({message, phone,imagen}:{message:string, phone:string,imagen: string}):Promise<any>
}