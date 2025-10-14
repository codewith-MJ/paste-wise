import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ROUTES from "@/shared/constants/routes";
import GoogleLoginButton from "./GoogleLoginButton";
import TitleBlock from "./TitleBlock";
import SkipLinkButton from "./SkipLinkButton";
import FeatureList from "./FeatureList";
import loginImage from "@/renderer/assets/login-img.png";
import { useAuthStore } from "@/renderer/stores/auth";

const BE_URL = "http://localhost:3000";

type LoggedInUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const [isStartingLogin, setIsStartingLogin] = useState(false);
  const [loginTransactionId, setLoginTransactionId] = useState<string | null>(
    null,
  );
  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleLogin = async () => {
    if (isStartingLogin) {
      return;
    }
    setIsStartingLogin(true);

    try {
      const { loginTransactionId } = await window.api.login.startGoogleLogin();
      setLoginTransactionId(loginTransactionId);
    } catch (error) {
      console.error("[login] start failed:", error);
    } finally {
      setIsStartingLogin(false);
    }
  };

  useEffect(() => {
    if (!loginTransactionId) {
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const res = await fetch(
          `${BE_URL}/auth/status?loginTransactionId=${encodeURIComponent(loginTransactionId)}`,
        );
        const data = await res.json();

        if (cancelled) {
          return;
        }

        console.log(data);

        if (data.status === "done" && data.user) {
          const user: LoggedInUser = data.user;
          setUser(user);

          setIsStartingLogin(false);
          navigate(ROUTES.HISTORY);
          return;
        }

        if (data.status === "error") {
          console.error("[login] status error:", data.errorMessage);
          setIsStartingLogin(false);
          return;
        }
        timer = setTimeout(poll, 2000);
      } catch (error) {
        console.error("[login] status fetch failed:", error);
        timer = setTimeout(poll, 2000);
      }
    };

    timer = setTimeout(poll, 600);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [loginTransactionId, navigate, setUser]);

  const handleSkipLogin = () => {
    navigate(ROUTES.HISTORY);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gray-50">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:gap-10">
        <section className="mx-auto ml-30 max-w-md">
          <TitleBlock />

          <div className="mt-5">
            <GoogleLoginButton
              onClick={handleGoogleLogin}
              disabled={isStartingLogin}
            />
          </div>

          <div className="mt-5">
            <FeatureList />
          </div>

          <div className="mt-6 text-center">
            <SkipLinkButton onClick={handleSkipLogin} />
          </div>
        </section>

        <aside className="mx-auto mr-20 w-full max-w-sm">
          <img
            src={loginImage}
            alt="Login illustration"
            className="w-full object-contain"
          />
        </aside>
      </div>
    </div>
  );
}

export default LoginPage;
