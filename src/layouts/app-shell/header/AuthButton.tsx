import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constants/routes";

function AuthButton() {
  const navigate = useNavigate();
  return (
    <button
      className="cursor-pointer rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
      aria-label="Logout"
      onClick={() => navigate(ROUTES.LOGIN)}
    >
      <LogIn size={20} />
    </button>
  );
}

export default AuthButton;
