// ToneDropdown.tsx
import { ArrowDown } from "lucide-react";

export type Tone = "All Tones" | "Polite" | "Casual" | "Formal" | "Friendly";
export const TONES: Tone[] = [
  "All Tones",
  "Polite",
  "Casual",
  "Formal",
  "Friendly",
];

type ToneDropdownProps = {
  value: Tone;
  onChange: (t: Tone) => void;
};

export default function ToneDropdown({ value, onChange }: ToneDropdownProps) {
  const isAll = value === "All Tones";

  return (
    <div className="relative inline-block">
      <select
        aria-label="Tone"
        value={value}
        onChange={(e) => onChange(e.target.value as Tone)}
        className={`appearance-none rounded-full px-3 py-1.5 pr-7 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none ${isAll ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-indigo-100 text-indigo-700"}`}
      >
        {TONES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <ArrowDown
        size={12}
        className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
}
