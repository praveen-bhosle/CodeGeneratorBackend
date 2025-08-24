import { Sender } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { NotFoundError } from "../lib/Errors";
import { llmResponseObject } from "../types/llmResponseObject";
import { ResponseFile } from "../types/FileStructure";

export async  function createProject(question:string) : Promise<number> { 
    const project = await prisma.project.create( { data : { title : "" } }) ;  
    await prisma.message.create({ data : { content : question , sentBy : Sender.USER , projectId : project.id  } })
    return project.id   ;
}

export async function addMessage( { projectId , content ,  sentBy   }  : { projectId : number  , content : string , sentBy  : Sender }) : Promise<number>  { 
    await prisma.message.create({ data : { content , sentBy  , projectId}}) ; 
    return projectId  ;
}

export async function getProject(id:number) { 
    const project = await prisma.project.findUnique({where: { id } ,  include: { messages : { orderBy : { id:'asc' } ,  select : {  id : true ,  content : true , sentBy: true  }}  , files : { orderBy : { id : 'asc'}  }  }}) ; 
    if(!project) throw new NotFoundError("No project exists for the given project id.") 
    return project 
}

export async function updateProject(id:number , query : string  ) { 
    const project = await prisma.project.findUnique({where: { id } ,  include: { messages : { orderBy : { id:'asc' } ,  select : {  id : true ,  content : true , sentBy: true  }}  , files : { orderBy : { id : 'asc'}  }  }}) ; 
    if(!project ) return ; 
    await prisma.message.create( { data : {  sentBy : Sender.USER , content : query  , projectId : project.id}}) ; 
    
}

export async function  handleLLMResponse(projectId : number , llmResponse : string  ) {
    const llmResponseObject : llmResponseObject = await JSON.parse(llmResponse) ; 
    const files:ResponseFile[]  =  llmResponseObject.files ;   
    for(const file of files ) { 
        await prisma.file.create( { data : {  filepath : file.filepath , content : file.content   , projectId : projectId}  }) ; 
    }
    const responseText  = llmResponseObject.text ; 
    await addMessage( { content : responseText , projectId   , sentBy : Sender.ASSISTANT}) ; 
}