import logger from "@/main/utils/logger";
import requireEnv from "@/main/utils/require-env";
import { ToneInfo } from "@/shared/types/tone";

const transform = async (
  source: string,
  tone: ToneInfo,
  isTranslated: boolean,
) => {
  const BACKEND_URL = requireEnv("BACKEND_URL");

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

    const response = await fetch(`${BACKEND_URL}/transformations`, {
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

    return data;
  } catch (error) {
    logger.error("[transform] request failed", error);
    throw error;
  }
};

export { transform };
