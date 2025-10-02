import { SHORTCUT_COMMAND } from "../constants/shortcuts";

type ShortcutListItem = {
  shortcutId: number;
  command: string;
  toneId: number | null;
  isDefault: number | null;
  toneName: string | null;
  accelerator: string;
};

type Shortcut = {
  command: string;
  toneName: string | null;
  accelerator: string;
};

type ShortcutUI = {
  shortcutId: string;
  command: string;
  toneId?: string | null;
  accelerator: string;
};

type ShortcutToRegister = {
  accelerator: string;
  shortcutAction: () => void;
};

type ShortcutCommandValue =
  (typeof SHORTCUT_COMMAND)[keyof typeof SHORTCUT_COMMAND];

export {
  ShortcutListItem,
  Shortcut,
  ShortcutUI,
  ShortcutToRegister,
  ShortcutCommandValue,
};
