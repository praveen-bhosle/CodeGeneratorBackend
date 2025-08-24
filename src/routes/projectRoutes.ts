import { Request, Response, Router } from "express";
import { HttpError, NotFoundError } from "../lib/Errors";
import { createProject, handleLLMResponse } from "../services/projectService";
import { Sender } from "@prisma/client";
import { sendMessage } from "../llmApis/sendMessage"; 
import { getProject } from "../services/projectService";

export const projectRouter = Router() ;  

projectRouter.post("/create" , async (req: Request , res : Response) => { 
    try {  
        const question = req.query['question'] ;
        if(!question) throw new NotFoundError("'question' query missing.")  
        const projectId = await createProject(question.toString()) ; 
        const chat = ` ${Sender.USER} : ${question}\n` ; 
        const llmResponse = await sendMessage(chat,true)  ; 
        await handleLLMResponse(projectId,llmResponse) ; 
        const project = await getProject(projectId) ; 
        res.status(200).json(project) ; 
        }
        catch(e) { 
          if(e instanceof HttpError) { 
            res.status(e.status!).send(e.message) ; 
          }
          else { 
            console.log(e) ; 
            res.status(500).send("internal server error"); 
          }
        }
})

projectRouter.get('/:id' , async (req:Request , res: Response) => { 
    try { 
    const id  = parseInt( req.params.id  ,10 )  ;  
    if(isNaN(id))  { res.status(400).json({error: "Invalid project id."}) ; return ; } 
    const project   = await  getProject(id) ;  
    res.status(200).json(project) ; 
    return  ;
    } 
    catch(e) { 
        if(e instanceof HttpError) { 
          res.status(e.status!).send(e.message) ; 
        }
        else { 
          console.log(e) ; 
          res.status(500).send("internal server error"); 
        }
    }
})

projectRouter.put("/:id" , async ( req : Request , res : Response ) => { 
    try{ 
    const query = req.query['query'] ; 
    if(!query) throw new NotFoundError("'query' query missing.")  
    const id  = parseInt( req.params.id  ,10 )  ;  
    if(isNaN(id))  { res.status(400).json({error: "Invalid project id."}) ; return ; }   
    let project  = await getProject(id) ;  
    const chat = `${Sender.USER} :  ${ JSON.stringify( { text : query , files : project.files } ) } \n`  ; 
    const llmResponse = await sendMessage( chat , false  ) ;
    await handleLLMResponse(id, llmResponse) ; 
    project = await getProject(id) ; 
    res.status(201).json(project) ; 
    }
    catch(e) { 
        if(e instanceof HttpError) { 
          res.status(e.status!).send(e.message) ; 
        }
        else { 
          console.log(e) ; 
          res.status(500).send("internal server error"); 
        }
    }
})   