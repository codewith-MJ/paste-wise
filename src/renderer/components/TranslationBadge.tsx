import { Languages } from "lucide-react";

type TranslationBadgeProps = {
  languageIn: string;
  languageOut: string;
};

function TranslationBadge({ languageIn, languageOut }: TranslationBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-blue-700">
      <Languages size={14} />
      {languageIn} → {languageOut}
    </span>
  );
}

export default TranslationBadge;
