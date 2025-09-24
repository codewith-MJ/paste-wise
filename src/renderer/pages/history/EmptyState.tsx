function EmptyState() {
  return (
    <div className="flex min-h-0 flex-1 justify-center pt-20">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-4xl bg-blue-100 text-2xl">
          📋
        </div>

        <h3 className="mb-3 text-xl font-semibold text-gray-900">
          아직 변환 기록이 없어요
        </h3>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm text-gray-600">
            텍스트를 복사하고 변환해보세요.
          </p>
          <div className="flex items-center justify-center gap-2">
            <kbd className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-lg font-medium">
              ⌘
            </kbd>
            <span className="text-gray-400">+</span>
            <kbd className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium">
              Shift
            </kbd>
            <span className="text-gray-400">+</span>
            <kbd className="rounded-lg border border-blue-400 bg-blue-500 px-3 py-2 text-sm font-medium text-white">
              C
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
