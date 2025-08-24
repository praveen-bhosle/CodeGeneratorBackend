import { prisma } from "../lib/prisma";
export async function createFile( { filepath  , content , projectId    } : { filepath : string  ,  content : string  , projectId : number    } ) {   
    await prisma.file.create( { data : { filepath , content , projectId  } }) ; 
}