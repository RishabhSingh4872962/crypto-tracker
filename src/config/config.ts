import { configDotenv } from "dotenv";

configDotenv()

const evnVariables={
    PORT:process.env.PORT || 3000,
    MONGO_URL:process.env.MONGO_URL || "",
    ENV:process.env.ENV || "Devlopement"
}


export const _config=Object.freeze(evnVariables);