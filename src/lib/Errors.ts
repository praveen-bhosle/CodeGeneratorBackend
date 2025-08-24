export class HttpError extends Error { 
    status? : number  ; 
}

export class NotFoundError extends HttpError { 
    constructor(message:string) { 
        super(message) ;
        this.status = 404 ; 
    }
}

export class InvalidTypeError extends HttpError { 
    constructor(message:string) { 
        super(message) 
    }
}