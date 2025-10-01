import { Routes, Route, Navigate } from "react-router-dom";
import {
  HistoryPage,
  TonePage,
  ShortcutPage,
  LoginPage,
  NotFoundPage,
} from "@/renderer/pages";
import ROUTES from "@/shared/constants/routes";
import AppShell from "@/renderer/layouts/app-shell/AppShell";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          path={ROUTES.ROOT}
          element={<Navigate to={ROUTES.HISTORY} replace />}
        />
        <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
        <Route path={ROUTES.TONES} element={<TonePage />} />
        <Route path={ROUTES.SHORTCUTS} element={<ShortcutPage />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
