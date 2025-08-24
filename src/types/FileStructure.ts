export type File = { 
    name : string , 
    path : string , 
    content : string 
}

export type Directory = { 
    files :File[] , 
    directories : Directory[] , 
    name : string , 
    path : string 
}

export type ResponseFile =  { 
    filepath : string , 
    content : string 
}