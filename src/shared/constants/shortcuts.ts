const SHORTCUT_COMMAND = {
  COPY_CAPTURE: "변환 복사",
  PASTE_APPLY: "변환 붙여넣기",
} as const;

const MODIFIER_KEY_MAP: Record<string, string> = {
  "⌘": "CommandOrControl",
  CTRL: "CommandOrControl",
  "⌥": "Alt",
  ALT: "Alt",
};

export { SHORTCUT_COMMAND, MODIFIER_KEY_MAP };
