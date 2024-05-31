import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User.model";
import { Alert } from "../../models/Alert.model";
import { I_CustomRequest } from "../../middlewares/isUserAuthenticated";
import createHttpError from "http-errors";
import { Types } from "mongoose";
export const createAlert = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    cryptoName,
    triggerPrice,
    repeat,
  }: { cryptoName: string; triggerPrice: string; repeat: string } = req.body;
  const user = (req as I_CustomRequest).user;

  const alreadyAlert = await Alert.findOne({
    createdBy: user._id,
    cryptoName,
    triggerPrice,
  });
  if (alreadyAlert) {
    return next(createHttpError(400, "Enter the diffrent Triggrer price"));
  }

  const alert = new Alert({
    cryptoName,
    triggerPrice,
    createdBy: user._id,
    repeat,
  });

  await alert.save();
  
interface alert{
  cryptoName: string;
  triggerPrice: string;
  repeat: "once" | "everytime";
  createdBy: Types.ObjectId;
  expiry: Date;
  triggerCount: number;
  lastTriggered: Date;
  createdAt: Date;
}

  User.emit("createAlert", JSON.stringify(alert),);

  return res
    .status(201)
    .send({ success: true, msg: "Alert Created Successfully" });
};
