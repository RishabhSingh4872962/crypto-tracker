import express from "express";
import { _config } from "./config/config";
import authRouter from "./routes/auth/auth.route";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use(globalErrorHandler);

export default app;