import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const loadEnv = () => {
  const devEnv = path.resolve(process.cwd(), ".env");
  const packagedEnv = path.resolve(
    process.resourcesPath ?? process.cwd(),
    "../.env",
  );
  const envPath = fs.existsSync(devEnv) ? devEnv : packagedEnv;

  const dotenv = require("dotenv");
  dotenv.config({ path: envPath });
};

export default loadEnv;
