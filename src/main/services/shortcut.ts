import { ShortcutUI } from "@/shared/types/shortcut";
import { getShortcutList as repoGetShortcutList } from "../infra/db/dao/shortcut";

async function getShortcutList(): Promise<ShortcutUI[]> {
  const shortcutList = await Promise.resolve(repoGetShortcutList());
  const formattedShortcutList = shortcutList.map((item) => ({
    ...item,
    shortcutId: String(item.shortcutId),
  }));

  return formattedShortcutList;
}

export { getShortcutList };
