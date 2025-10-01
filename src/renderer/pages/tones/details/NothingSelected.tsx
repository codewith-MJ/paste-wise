function NothingSelected() {
  return (
    <section className="flex flex-1 items-center justify-center overflow-y-auto">
      <div className="text-center text-gray-500">
        <div className="mb-3 text-4xl">💬</div>
        <p className="text-lg font-medium">선택된 말투가 없습니다</p>
        <p className="text-sm text-gray-400">
          왼쪽 목록에서 말투를 선택해주세요
        </p>
      </div>
    </section>
  );
}

export default NothingSelected;
