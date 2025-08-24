import  {PrismaClient} from "@prisma/client" ; 
import dotenv from 'dotenv' ; 
dotenv.config() ; 
const globalForPrimsa = globalThis as unknown as { prisma : PrismaClient | undefined  } 
const prisma =  globalForPrimsa.prisma ||  new PrismaClient({log:['query','error','info','warn']}) ; 
if(process.env.NODE_ENV !== 'production') { 
    globalForPrimsa.prisma  = prisma ;  
}
export { prisma } ;  