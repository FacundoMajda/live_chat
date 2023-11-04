import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.level}: ${info.message} | ${info.timestamp}`
  )
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), logFormat),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format: logFormat, 
  }),
  new winston.transports.File({
    filename: "logs/all.log",
    format: logFormat, 
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format: logFormat,
  transports,
});

export default logger;