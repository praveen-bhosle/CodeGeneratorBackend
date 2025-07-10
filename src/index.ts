import dotenv from 'dotenv' ; 
dotenv.config() ; 
const api_key = process.env.OPENAI_API_KEY ; 
const api_url = process.env.OPENAI_BASEURL || 'placeholder' ; 

import express , { Request , Response  } from 'express' 

import axios  from 'axios';
import { getInitialPrompt } from './utils/Prompts';

const app = express()  ; 


app.get("/ask" , async ( req: Request , res: Response ) => {  
 if(!req.query['question']) { 
    res.send("query parameter is missing") ; 
    return ; 
 }
 const initialPrompt =  getInitialPrompt(req.query['question']?.toString()) ; 
  const response =  await  axios.post(  api_url , { "model": "gpt-4.1",
  "input": initialPrompt   } , { headers : {  'Authorization' :  `Bearer ${api_key}`  }}) ;
  const responseData =  response.data ; 
  //@ts-ignore
  console.log(responseData['output'][0]['content']);
  //@ts-ignore
  console.log(responseData['output'][0]['content'][0]['text']) ;
  //@ts-ignore
  res.send(responseData['output'][0]['content'][0]['text']) ;  
}) 


app.listen( 5000 , () => {
    console.log("server running successfully.") ; 
})