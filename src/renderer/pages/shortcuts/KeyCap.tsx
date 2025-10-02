function KeyCap({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="inline-flex min-w-[28px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-800 shadow-inner"
      style={{ lineHeight: 1.1 }}
    >
      {children}
    </kbd>
  );
}

export default KeyCap;
