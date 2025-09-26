import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const pino = require("pino");

const logger =
  process.env.NODE_ENV !== "production"
    ? pino({
        level: "debug",
        transport: { target: "pino-pretty", options: { colorize: true } },
      })
    : pino({ level: "info" });

export default logger;
