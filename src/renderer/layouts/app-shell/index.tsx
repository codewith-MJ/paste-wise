import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./Sidebar";

function AppShell() {
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
