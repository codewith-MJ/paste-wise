type ShortcutListItem = {
  shortcutId: number;
  command: string;
  toneTitle: string | null;
  accelerator: string;
};

type Shortcut = {
  command: string;
  toneTitle: string | null;
  accelerator: string;
};

type ShortcutUI = {
  shortcutId: string;
  command: string;
  toneTitle: string | null;
  accelerator: string;
};

export { ShortcutListItem, Shortcut, ShortcutUI };
