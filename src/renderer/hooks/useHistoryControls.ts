import { useState } from "react";
import { ALL_TONE } from "@/shared/constants/tone";

export default function useHistoryControls() {
  const [filters, setFilters] = useState({
    sortOrder: "desc" as "desc" | "asc",
    isTranslation: false,
    tone: ALL_TONE as string,
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeyword = (value: string) => {
    setSearchKeyword(value);
  };

  const toggleSort = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  const toggleTranslation = () => {
    setFilters((prev) => ({ ...prev, isTranslation: !prev.isTranslation }));
  };

  const changeTone = (tone: string) => {
    setFilters((prev) => ({ ...prev, tone }));
  };

  const resetAll = () => {
    setFilters({ sortOrder: "desc", isTranslation: false, tone: ALL_TONE });
  };

  return {
    filters,
    searchKeyword,
    handleSearchKeyword,
    toggleSort,
    toggleTranslation,
    changeTone,
    resetAll,
  };
}
