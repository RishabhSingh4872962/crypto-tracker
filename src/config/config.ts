import { configDotenv } from "dotenv";

configDotenv();

const evnVariables = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || "",
  ENV: process.env.ENV || "Devlopement",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "keynotfound",

  redis_hostname: process.env.REDIS_HOSTNAME,
  redis_port: process.env.REDIS_PORT,
  redis_password: process.env.REDIS_PASSWORD,
  redis_hash_key:process.env.REDIS_HASH_KEY|| "redissdadahshkettv"
};

export const _config = Object.freeze(evnVariables);
