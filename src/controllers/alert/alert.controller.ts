import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User.model";
export const createAlert = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {

    User.emit("createAlert","the new alert is created")

    return res.status(201).send({success:true,msg:"Alert Created Successfully"});
};
