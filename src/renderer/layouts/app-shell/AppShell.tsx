import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./Sidebar";
import useConversionHud from "@/renderer/hooks/useConversionHud";

function AppShell() {
  useConversionHud();
  return (
    <>
      <Header />
      <Sidebar />
      <main className="h-screen overflow-auto pt-16 pl-20">
        <Outlet />
      </main>
    </>
  );
}

export default AppShell;
