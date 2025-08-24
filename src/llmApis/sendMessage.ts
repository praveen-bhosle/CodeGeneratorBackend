import axios   from 'axios';
import dotenv from "dotenv" ; 
import { initialPrompt, updatePrompt } from '../utils/Prompts';


dotenv.config() 
const api_key = process.env.OPENAI_API_KEY ; 
const api_url = process.env.OPENAI_BASEURL! ; 

export async function  sendMessage( chat :string , isInitial : boolean  ) { 
    const prompt = isInitial ? initialPrompt : updatePrompt ;
    const input = 'SYSTEM : ' + prompt + '\n' + chat ;  
    const llmResponse = await  axios.post( api_url , { "model": "gpt-4.1","input":  input  } , { headers : {  'Authorization' :  `Bearer ${api_key}`  }}).then(  response => response.data )  ;  
    //@ts-ignore 
    const msg:string  = JSON.stringify(llmResponse['output'][0]['content'][0]['text']) ;
    return msg ; 
}