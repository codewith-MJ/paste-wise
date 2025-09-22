import { Routes, Route } from "react-router-dom";
import HistoryPage from "@/pages/history";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}
