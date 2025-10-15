import { LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/shared/constants/routes";
import { useAuthStore } from "@/renderer/stores/auth";

function AuthButton() {
  const navigate = useNavigate();
  const { isAuthenticated, clear } = useAuthStore();

  const handleClick = () => {
    if (isAuthenticated) {
      clear();
      navigate(ROUTES.HISTORY);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 active:scale-[0.97]"
    >
      {isAuthenticated ? (
        <>
          <LogOut size={18} strokeWidth={2} />
          <span>로그아웃</span>
        </>
      ) : (
        <>
          <LogIn size={18} strokeWidth={2} />
          <span>로그인</span>
        </>
      )}
    </button>
  );
}

export default AuthButton;
