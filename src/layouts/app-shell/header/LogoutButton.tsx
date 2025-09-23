import { LogOut } from "lucide-react";

function LogoutButton() {
  return (
    <button
      className="cursor-pointer p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
      aria-label="Logout"
    >
      <LogOut size={20} />
    </button>
  );
}

export default LogoutButton;
