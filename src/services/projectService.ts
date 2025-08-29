import { Project, Sender } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { NotFoundError } from "../lib/Errors";
import { llmResponseObject } from "../types/llmResponseObject";

export async  function createProject(question:string) : Promise<Project> { 
    const project = await prisma.project.create( { data : { title : ""  , files: "" } }) ;  
    await prisma.message.create({ data : { content : question , sentBy : Sender.USER , projectId : project.id  } })
    return project    ;
}

export async function addMessage( { projectId , content ,  sentBy   }  : { projectId : number  , content : string , sentBy  : Sender }) : Promise<number>  { 
    await prisma.message.create({ data : { content , sentBy  , projectId}}) ; 
    return projectId  ;
}

export async function getProject(id:number) { 
    const project = await prisma.project.findUnique({where: { id } ,  include: { messages : { orderBy : { id:'asc' } ,  select : {  id : true ,  content : true , sentBy: true  }}  }}) ; 
    if(!project) throw new NotFoundError("No project exists for the given project id.") 
    return project 
}

export async function updateProject(id:number , query : string  ) { 
    const project = await prisma.project.findUnique({where: { id } ,  include: { messages : { orderBy : { id:'asc' } ,  select : {  id : true ,  content : true , sentBy: true  }}   }}) ; 
    if(!project ) return ; 
    await prisma.message.create( { data : {  sentBy : Sender.USER , content : query  , projectId : project.id}}) ; 
    
}

export async function  handleLLMResponse(project : Project , llmResponse : string  ) {
    console.log("handling llm response") ; 
   // const llmResponseObject1 : llmResponseObject = await JSON.parse(llmResponse) ; 
    const llmResponseObject : llmResponseObject = await JSON.parse(llmResponse) ;  
    console.log("llm response object") ; 
    console.log(llmResponseObject) ;
    console.log(typeof llmResponseObject) ; 
    console.log(llmResponseObject.text) ;
    console.log(llmResponseObject.files) ;
    const files  =  JSON.stringify(llmResponseObject.files) ;   
    console.log("adding files") ;
    await prisma.project.update(   {  where : {  id : project.id } , data:{files}}) ; 
    const responseText  = llmResponseObject.text ; 
    console.log("updating messages") ; 
    console.log("llm response text " +  responseText) ; 
    await addMessage( { content : responseText , projectId :  project.id   , sentBy : Sender.ASSISTANT}) ; 
}