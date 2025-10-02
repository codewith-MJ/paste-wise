import React from "react";
import KeyCap from "./KeyCap";

const parseCombo = (accelerator: string): string[] => {
  return accelerator
    .split("+")
    .map((s) => s.trim())
    .filter(Boolean);
};

function ShortcutRow({
  id,
  label,
  comboText,
}: {
  id: string;
  label: string;
  comboText: string;
}) {
  const keys = parseCombo(comboText);

  return (
    <div
      className="flex items-center justify-between gap-3"
      data-id={id}
      role="listitem"
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate text-sm font-medium text-gray-900">
          {label}
        </span>
      </div>

      <div
        className="flex items-center gap-1.5 rounded-xl bg-white px-2 py-1 ring-1 ring-gray-200"
        aria-label={`${label} 단축키`}
      >
        {keys.map((key, index) => (
          <React.Fragment key={`${id}-${key}`}>
            {index > 0 && (
              <span
                className="mx-0.5 -mt-0.5 text-[10px] font-semibold text-gray-400"
                aria-hidden
              >
                +
              </span>
            )}
            <KeyCap>{key}</KeyCap>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ShortcutRow;
