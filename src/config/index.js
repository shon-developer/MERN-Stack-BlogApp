import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET || "mysecret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
};

export default config;
