import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { verifyToken } from "../helpers/verifyToken";
import { userPayload } from "../interfaces/userSchemaInterface";
import { User } from "../models/userModels/user.model";

export interface I_CustomRequest extends Request {
  user: userPayload;
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

  const sessionToken: string = req.cookies?.sessionToken;
  

  if (!sessionToken) {
    return next(createHttpError(500, "Internal server Error"));
  }
  const sessionId = await verifyToken(sessionToken);

  

  if (!sessionId) {
    return next(createHttpError(500, "Internal server Error"));
  }

  const user = await User.findOne({ _id: userPayload.id });

  if (Number(user?.failedLogin)>3) {
    return  res.status(403).send('Forbidden');
    }
  

  if (!user) {
    res.clearCookie("token").clearCookie("sessionToken");
    return next(createHttpError(400, "Make a login"));
  }

  const existSession = user?.authHistory?.find((sessionObj) => {
    return sessionObj?.sessionId == (sessionId.id as unknown as string);
  });

  if (!existSession) {
    res.clearCookie("token").clearCookie("sessionToken");
    return next(createHttpError(400, "Session Ended"));
  }

  (req as I_CustomRequest).user = userPayload;

  next();
};
