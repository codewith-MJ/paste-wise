import clsx from "clsx";
import { NavLink } from "react-router-dom";
import ROUTES from "@/shared/constants/routes";

type SidebarItem = {
  id: "history" | "tones" | "shortcuts";
  icon: string;
  label: string;
  path: string;
  end?: boolean;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "history", icon: "🕑", label: "변환 기록", path: ROUTES.HISTORY },
  { id: "tones", icon: "🙂", label: "말투 설정", path: ROUTES.TONES },
  { id: "shortcuts", icon: "⌨️", label: "단축키 설정", path: ROUTES.SHORTCUTS },
];

function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-20 border-r border-gray-200 bg-white py-5">
      <nav className="flex flex-col items-center gap-3" aria-label="Primary">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "group flex w-18 cursor-pointer flex-col items-center gap-1 rounded-xl px-2 py-2 transition-colors",
                "focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:outline-none",
                isActive ? "bg-[#DFF3FF]" : "hover:bg-gray-200",
              )
            }
            title={item.label}
          >
            {({ isActive }) => (
              <>
                <span
                  className={clsx(
                    "text-xl leading-none",
                    isActive ? "text-blue-700" : "text-gray-700",
                  )}
                >
                  {item.icon}
                </span>
                <span
                  className={clsx(
                    "text-[12px] leading-none",
                    isActive
                      ? "font-medium text-blue-700"
                      : "text-gray-500 group-hover:text-gray-800",
                  )}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
