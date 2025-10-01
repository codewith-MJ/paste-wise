import { ShortcutUI } from "@/shared/types/shortcut";

export const DEFAULT_ACTIONS: ShortcutUI[] = [
  {
    shortcutId: "act.copy",
    command: "Transform Copy",
    accelerator: "Command + Option + C",
  },
  {
    shortcutId: "act.paste",
    command: "Transform Paste",
    accelerator: "Command + Shift + V",
  },
  {
    shortcutId: "act.mode",
    command: "Mode Selector",
    accelerator: "Command + Option + M",
  },
  {
    shortcutId: "act.result",
    command: "Result Selector",
    accelerator: "Command + Option + R",
  },
];

export const DEFAULT_TONES: ShortcutUI[] = [
  {
    shortcutId: "mode.translate",
    command: "Translation",
    toneName: null,
    accelerator: "Command + Shift + T",
  },
  {
    shortcutId: "mode.polite",
    command: "Polite Tone",
    toneName: "Polite",
    accelerator: "Command + Shift + 1",
  },
  {
    shortcutId: "mode.formal",
    command: "Formal Tone",
    toneName: "Formal",
    accelerator: "Command + Shift + 2",
  },
  {
    shortcutId: "mode.casual",
    command: "Casual Tone",
    toneName: "Casual",
    accelerator: "Command + Shift + 3",
  },
];

// 선택 가능한 모드 목록(목업)
export const AVAILABLE_MODES = [
  { id: "mode.friendly", name: "Friendly Tone" },
  { id: "mode.professional", name: "Professional Tone" },
  { id: "mode.creative", name: "Creative Tone" },
];
