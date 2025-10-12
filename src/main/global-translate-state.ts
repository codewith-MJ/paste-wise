import logger from "./utils/logger";

let translateMode = false;

const getTranslateMode = () => translateMode;
const toggleTranslateMode = () => {
  translateMode = !translateMode;
  logger.info(`[translateMode] ${translateMode ? "ON" : "OFF"}`);
};

export { getTranslateMode, toggleTranslateMode };
