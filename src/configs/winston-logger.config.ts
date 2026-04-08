import winston from "winston";
import path from "path";
import fs from "fs";
import { getEnvironmentConfig } from "./environment.config";

const logDir = path.join(__dirname, "../../logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, ...metadata }) => {
    const metaStr = Object.keys(metadata).length
      ? JSON.stringify(metadata)
      : "";

    return `${timestamp} [${level}] ${message} ${metaStr}`;
  }),
);

const logger = winston.createLogger({
  level: getEnvironmentConfig().logLevel,
  format: jsonFormat,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: "logs/orangeHRM_UI_Automation.json",
      format: jsonFormat,
      maxsize: 5 * 1024 * 1024,
      maxFiles: 7,
    }),
  ],
});

export default logger;
