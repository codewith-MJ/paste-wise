import { ToneItemUI } from "@/shared/types/tone";
import {
  getToneList as repoGetToneList,
  getToneById as repoGetToneById,
} from "@/main/infra/db/dao/tone";
import { isAuthenticated } from "@/main/infra/auth/token-store";
import fetchMergedToneList from "./tone-remote";
import { mapDetailRowToToneUI, mapListRowToToneUI } from "./tone-mapper";

const getToneList = async (): Promise<ToneItemUI[]> => {
  if (isAuthenticated()) {
    const serverList = await fetchMergedToneList();
    return serverList;
  }

  const toneList = await Promise.resolve(repoGetToneList());
  return toneList.map(mapListRowToToneUI);
};

const getToneById = async (toneId: number): Promise<ToneItemUI | null> => {
  const tone = await Promise.resolve(repoGetToneById(toneId));

  return tone ? mapDetailRowToToneUI(tone) : null;
};

export { getToneList, getToneById };
