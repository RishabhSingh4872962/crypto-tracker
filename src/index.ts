import express from "express";
import { _config } from "./config/config";
import authRouter from "./routes/auth/auth.route";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

import cookieParser from "cookie-parser";
import alertRouter from "./routes/alerts/alert.route";
import { isUserAuthenticated } from "./middlewares/isUserAuthenticated";

import session from "express-session";

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Setup session middleware
export const sessionParser = session({
  saveUninitialized: false,
  secret: "secret-key",
  resave: false,
});
app.use(sessionParser);

app.use("/api/v1/user/auth", authRouter);
app.use("/api/v1/user/alert", isUserAuthenticated, alertRouter);

app.use(globalErrorHandler);

export default app;
