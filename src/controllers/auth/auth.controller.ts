import { Response ,Request,NextFunction} from "express";

export const userRegister=function(req:Request,res:Response,next:NextFunction){

    return res.status(201).send({success:true,msg:"User created Successfully"})
}