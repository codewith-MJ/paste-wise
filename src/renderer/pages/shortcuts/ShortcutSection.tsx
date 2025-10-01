import React from "react";

export default function ShortcutSection({
  emoji,
  title,
  description,
  children,
}: {
  title: string;
  emoji: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section role="region" aria-labelledby={title}>
      <div className="flex items-start gap-3 border-b border-gray-100 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-base">
          <span aria-hidden className="text-2xl">
            {emoji}
          </span>
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold !text-blue-700 text-gray-900">
            {title}
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <ul className="divide-y divide-gray-100">{children}</ul>
    </section>
  );
}
