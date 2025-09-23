import { Routes, Route, Navigate } from "react-router-dom";
import {
  HistoryPage,
  ModesPage,
  ShortcutsPage,
  LoginPage,
  NotFoundPage,
} from "@/pages";
import ROUTES from "@/constants/routes";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path={ROUTES.ROOT}
        element={<Navigate to={ROUTES.HISTORY} replace />}
      />
      <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
      <Route path={ROUTES.MODES} element={<ModesPage />} />
      <Route path={ROUTES.SHORTCUTS} element={<ShortcutsPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
