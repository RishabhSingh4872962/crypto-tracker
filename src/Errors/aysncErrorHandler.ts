import { Response ,Request,NextFunction} from "express";


type func=(req:Request,res:Response,next:NextFunction)=>void

export const asyncErrorHandler= (func:func)=>{
   
return async function (req:Request,res:Response,next:NextFunction){
    try {
        await func(req,res,next);
    } catch (error) {
        return next(error);
    }
}
}