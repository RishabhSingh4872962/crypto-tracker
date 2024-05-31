import { Request, Response, NextFunction } from "express";
export const createAlert = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {

    return res.status(201).send({success:true,msg:"Alert Created Successfully"});
};
