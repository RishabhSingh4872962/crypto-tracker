import { userPayload } from './generateToken';
import jwt from "jsonwebtoken";
import { _config } from "../config/config";
type verifyJWT = (token: string) => userPayload | null;

export const verifyToken: verifyJWT = (token: string) => {

  if (_config?.jwtSecretKey) {

    return jwt.verify(token, _config?.jwtSecretKey, { complete: true })
      .payload as userPayload;
  }
  return null;
};
