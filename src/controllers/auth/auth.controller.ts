import  bcrypt  from 'bcrypt';
import { Response, Request, NextFunction } from "express";
import { User } from "../../models/User.model";
import createHttpError from "http-errors";
import { generateToken } from "../../helpers/generateToken";

export const userRegister = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400,"Enter the valid Credensials"));
  }


  const alreadyUser = await User.findOne({ email });

  if (alreadyUser) {
    return next(createHttpError(400, "User already exist"));
  }

  const user = new User({
    name,
    email,
    password,
  });

  await user.save();

  const token = await generateToken({ userId: user.id });
  if (!token) {
    return next(createHttpError(500, "Internal Server Error"));
  }
  res.cookie("token", token, {
    maxAge: Date.now() + 60 * 60 * 24 * 3 * 1000,
  });
  return res
    .status(201)
    .send({ success: true, msg: "User created Successfully" });
};

export const userLogin = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    email,
    password,
    cpassword
  }: {
    email: string;
    password: string;
    cpassword: string;
  } = req.body;

  if (!password ||!email || !cpassword || password!=cpassword) {
    return next(createHttpError(400,"Enter the valid Credensials"));
  }


  const user = await User.findOne({ email }).select("password");

  if (!user) {
    return next(createHttpError(400, "Enter the Valid Credensials"));
  }


  if (!(await bcrypt.compare(password,user.password))) {
    return next(createHttpError(401,"Enter the valid Credensials"));
  }
  

  const token = await generateToken({ userId: user.id });
  if (!token) {
    return next(createHttpError(500, "Internal Server Error"));
  }
  res.cookie("token", token, {
    maxAge: Date.now() + 60 * 60 * 24 * 3 * 1000,
  });
  return res
    .status(200)
    .send({ success: true, msg: "User login Successfully" });
};


export const userLogout=async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.status(200).clearCookie("token").send({success:true,msg:"User logout Successfully"});
  }