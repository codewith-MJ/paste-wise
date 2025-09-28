import { MODIFIER_KEY_MAP } from "@/shared/constants/shortcuts";

const convertShortcut = (shortcut: string) => {
  if (!shortcut) {
    return null;
  }

  const keys = shortcut.split("+").map((key) => key.trim());
  if (keys.length === 0) {
    return null;
  }

  const convertedAccelerator = keys
    .map((key) => {
      const upperCaseKey = key.toUpperCase();
      return (
        MODIFIER_KEY_MAP[key] || MODIFIER_KEY_MAP[upperCaseKey] || upperCaseKey
      );
    })
    .join("+");

  return convertedAccelerator;
};

export default convertShortcut;
