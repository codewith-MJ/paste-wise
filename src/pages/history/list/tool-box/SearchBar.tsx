import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative mb-3">
      <Search
        size={16}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        placeholder="Search history..."
        className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-9 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
