import { ToneItemUI } from "@/shared/types/tone";
import { getToneList as repoGetToneList } from "../infra/db/dao/tone";

async function getToneList(): Promise<ToneItemUI[]> {
  const toneList = await Promise.resolve(repoGetToneList());
  const formattedToneList = toneList.map((item) => ({
    ...item,
    toneId: String(item.toneId),
    isDefault: item.isDefault === 1,
  }));

  return formattedToneList;
}

export { getToneList };
