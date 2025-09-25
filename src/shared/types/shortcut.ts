export type ShortcutListItem = {
  shortcutId: number;
  command: string;
  toneId: number | null;
  accelerator: string;
};

export type Shortcut = {
  command: string;
  toneId: number | null;
  accelerator: string;
};
