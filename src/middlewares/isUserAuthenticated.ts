import { userPayload } from "./../helpers/generateToken";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { verifyToken } from "../helpers/verifyToken";
import { User } from "../models/User.model";
import mongoose, { ObjectId } from "mongoose";

export interface I_CustomRequest extends Request {
  user: mongoose.Types.ObjectId;
}

export const isUserAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies?.token;

  if (!token) {
    return next(createHttpError(400, "Make a login or session expired"));
  }

  const userPayload = await verifyToken(token);

  if (!userPayload) {
    return next(createHttpError(400, "Make a login"));
  }

  const user = await User.findOne({ _id: userPayload.userId });

  if (!user) {
    res.clearCookie("token").clearCookie("sessionToken");
    return next(createHttpError(400, "Make a login"));
  }

  (req as I_CustomRequest).user = user._id;

  next();
};
