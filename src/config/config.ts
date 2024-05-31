import { configDotenv } from "dotenv";

configDotenv()

const evnVariables={
    PORT:process.env.PORT || 3000,
    MONGO_URL:process.env.MONGO_URL || "",
    ENV:process.env.ENV || "Devlopement",
    jwtSecretKey:process.env.JWT_SECRET_KEY || "keynotfound"
}


export const _config=Object.freeze(evnVariables);