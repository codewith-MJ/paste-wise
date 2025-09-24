import { Copy } from "lucide-react";

type Props = {
  label: "Original" | "Transformed";
  text: string;
};

function MessageCard({ label, text }: Props) {
  const styles =
    label === "Original"
      ? {
          dotColor: "bg-gray-400",
          borderColor: "border-gray-200",
          bgColor: "bg-gray-50",
          textColor: "text-gray-800",
          copyHover: "hover:bg-gray-100 hover:text-gray-600",
        }
      : {
          dotColor: "bg-blue-500",
          borderColor: "border-blue-200",
          bgColor: "bg-blue-50",
          textColor: "text-blue-900",
          copyHover: "hover:bg-blue-100 hover:text-blue-600",
        };

  return (
    <section className="group">
      <header className="mb-3 flex items-center justify-between text-lg font-semibold text-gray-700">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${styles.dotColor}`} />
          {label}
        </div>
        <button
          className={`cursor-pointer rounded-lg p-2 text-gray-400 ${styles.copyHover}`}
          aria-label={`Copy ${label}`}
        >
          <Copy size={16} />
        </button>
      </header>

      <div
        className={`rounded-xl border ${styles.borderColor} ${styles.bgColor} p-6`}
      >
        <p
          className={`leading-relaxed break-words whitespace-pre-wrap ${styles.textColor}`}
        >
          {text}
        </p>
      </div>
    </section>
  );
}

export default MessageCard;
