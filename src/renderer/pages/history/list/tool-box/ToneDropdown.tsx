import { ArrowDown } from "lucide-react";
import { ALL_TONE } from "@/shared/constants/tone";

type ToneDropdownProps = {
  value: string;
  options: string[];
  onChange: (t: string) => void;
};

export default function ToneDropdown({
  value,
  options,
  onChange,
}: ToneDropdownProps) {
  const isAll = value === ALL_TONE;

  return (
    <div className="relative inline-block">
      <select
        aria-label="Tone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-full px-3 py-1.5 pr-7 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none ${isAll ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-indigo-100 text-indigo-700"}`}
      >
        {options.map((tone) => (
          <option key={tone} value={tone}>
            {tone}
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
