import cors from 'cors' ;
import express , {  Response  } from 'express'  
import { env } from 'process';
const app = express()  ; 
import { projectRouter } from './routes/projectRoutes';
app.use(cors()) 
app.use('/project' , projectRouter) ; 
app.get('/health' , ( res:Response ) => { res.status(200).send("all ok") ;   } )
const main = async () => { 
app.listen( 5000 , () => {  
    console.log("server running successfully.") ; 
    console.log(env.DATABASE_URL)
})} 
main();   