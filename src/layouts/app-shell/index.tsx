import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppShell() {
  return (
    <main>
      <Sidebar />
      <Header />
      <section>
        <Outlet />
      </section>
    </main>
  );
}

export default AppShell;
