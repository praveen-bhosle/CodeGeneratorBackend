import { message, Sender } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Result } from "../types/Result";
export async function  getProjectMessages(id : number) : Promise<message[]>  { 
    const messages   = await prisma.message.findMany( { where : { projectId : id  , sentBy : { not : Sender.SYSTEM} } , orderBy : { id : 'asc'}  } ) ; 
    return messages ; 
}  