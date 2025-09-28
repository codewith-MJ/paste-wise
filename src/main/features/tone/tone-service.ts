import { ToneItemUI } from "@/shared/types/tone";
import {
  getToneList as repoGetToneList,
  getToneById as repoGetToneById,
} from "@/main/infra/db/dao/tone";
const getToneList = async (): Promise<ToneItemUI[]> => {
  const toneList = await Promise.resolve(repoGetToneList());
  const formattedToneList = toneList.map((item) => ({
    ...item,
    toneId: String(item.toneId),
    isDefault: item.isDefault === 1,
  }));

  return formattedToneList;
};

const getToneById = async (toneId: number): Promise<ToneItemUI | null> => {
  const tone = await Promise.resolve(repoGetToneById(toneId));

  if (tone) {
    const formattedTone = {
      ...tone,
      toneId: String(tone.toneId),
      isDefault: tone.isDefault === 1,
      emojiAllowed: tone.emojiAllowed === 1,
    };

    return formattedTone;
  }

  return tone;
};

export { getToneList, getToneById };
