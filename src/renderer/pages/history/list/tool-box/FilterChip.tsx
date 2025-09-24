import { type ReactNode } from "react";

type Props = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  title?: string;
};

export default function FilterChip({
  active,
  onClick,
  children,
  title,
}: Props) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
