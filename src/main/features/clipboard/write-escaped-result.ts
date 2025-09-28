import { clipboard } from "electron";
import sleep from "@/main/utils/sleep";

const WRITE_TO_PASTE_DELAY = 260;

const writeEscapedTransfromedResult = async (transformedResult: string) => {
  const escaped = transformedResult
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  clipboard.clear();
  clipboard.write({
    text: transformedResult,
    html: `<meta charset="utf-8">${escaped}`,
  });

  await sleep(WRITE_TO_PASTE_DELAY);
};

export default writeEscapedTransfromedResult;
