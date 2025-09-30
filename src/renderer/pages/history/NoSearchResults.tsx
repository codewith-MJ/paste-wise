import { Search } from "lucide-react";

function NoSearchResults({ searchKeyword }: { searchKeyword: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
        <Search size={20} className="text-gray-700" />
      </div>
      <h3 className="mb-2 text-base font-medium text-gray-800">
        검색 결과가 없습니다.
      </h3>
      {searchKeyword && (
        <p className="text-sm text-gray-600">
          &quot;{searchKeyword}&quot;에 대한 기록을 찾을 수 없습니다
        </p>
      )}
    </div>
  );
}

export default NoSearchResults;
