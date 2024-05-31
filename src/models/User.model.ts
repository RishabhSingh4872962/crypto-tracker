import { NextFunction } from "express";
import mongoose from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 16,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 16,
    select: false,
  },
}).pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export const User = mongoose.model("User", userSchema);
