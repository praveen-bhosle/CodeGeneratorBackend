import { getProjectMessages } from "../utils/GetProjectMessages";

export const createChat = async ( projectId : number) : Promise<string>  => {  
    const messages  = await  getProjectMessages(projectId);  
    let  chat:string = '' ; 
    messages.forEach( (msg) => chat += ( msg.sentBy + " : " + msg.content + '\n') ) ; 
    return chat ;  
}
