import { ResponseFile } from "./FileStructure"

export type llmResponseObject  = { 
  text : string , 
  files :  ResponseFile[]
}