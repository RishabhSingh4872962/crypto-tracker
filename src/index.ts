import express from "express";
import { _config } from "./config/config";
import authRouter from "./routes/auth/auth.route";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

import cookieParser from "cookie-parser";
import alertRouter from "./routes/alerts/alert.route";
import { isUserAuthenticated } from "./middlewares/isUserAuthenticated";
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/user/auth", authRouter);
app.use("/api/v1/user/alert",isUserAuthenticated, alertRouter);


app.use(globalErrorHandler);

export default app;