import jwt from "jsonwebtoken";
import { _config } from "../config/config";
import { ObjectId } from "mongoose";

interface userPayload{
userId:string
}


export const generateToken=async function (userPayload:userPayload) {
    
    const token=await jwt.sign(userPayload,_config.jwtSecretKey);

    if (token) {
        return token
    }else{
        return null
    }
}