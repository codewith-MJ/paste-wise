import logger from "@/main/utils/logger";
import { ToneInfo } from "@/shared/types/tone";

const BACKEND_URL = "http://localhost:3000/transformations";

const transform = async (
  source: string,
  tone: ToneInfo,
  isTranslated: boolean,
) => {
  try {
    const payload = {
      originalText: source,
      isTranslated,
      toneInfo: {
        tonePrompt: tone.tonePrompt,
        toneStrength: tone.toneStrength,
        emojiAllowed: tone.emojiAllowed,
      },
    };

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      logger.error(`[transform] backend error: ${response.status} ${text}`);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    logger.info(`[transform] success (translated=${isTranslated})`);

    return data.transformedText ?? "";
  } catch (error) {
    logger.error("[transform] request failed", error);
    throw error;
  }
};

export { transform };
