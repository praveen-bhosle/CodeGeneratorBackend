import dotenv from 'dotenv' ; 
import cors from 'cors' ;
dotenv.config() ; 
const api_key = process.env.OPENAI_API_KEY ; 
const api_url = process.env.OPENAI_BASEURL || 'placeholder' ; 

import { responseModel } from './db';

import mongoose from 'mongoose';

import express , { Request , Response  } from 'express' 

import axios  from 'axios';
import { getInitialPrompt } from './utils/Prompts';

const app = express()  ; 

app.use(cors()) 


app.get("/ask" , async ( req: Request , res: Response ) => {  
  if(!req.query['question']) { 
    res.send("query parameter is missing") ; 
    return ; 
  }
  const initialPrompt =  getInitialPrompt(req.query['question']?.toString()) ; 
  let data = await responseModel.findOne()  ; 
  if(!data) { 
  const response =  await  axios.post(  api_url , { "model": "gpt-4.1","input": initialPrompt   } , { headers : {  'Authorization' :  `Bearer ${api_key}`  }}) ;
 const responseData = response.data ; 
  //@ts-ignore
  data = await responseModel.create( { response : responseData['output'][0]['content'][0]['text'] }) 
  } 
  res.send(data.response)  ; 
}) 



const main = async () => { 
await mongoose.connect("mongodb://127.0.0.1:27017/codegen") ; 
app.listen( 5000 , () => {  
    console.log("server running successfully.") ; 
}) } 

main() ; 