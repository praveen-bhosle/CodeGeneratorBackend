import { Schema , Types , model  } from "mongoose";
const responseSchema = new Schema({ 
    response : Object
})
 const responseModel = model("responses" , responseSchema) ; 

 export { responseModel }  ; 