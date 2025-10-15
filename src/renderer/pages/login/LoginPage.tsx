import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ROUTES from "@/shared/constants/routes";
import GoogleLoginButton from "./GoogleLoginButton";
import TitleBlock from "./TitleBlock";
import SkipLinkButton from "./SkipLinkButton";
import FeatureList from "./FeatureList";
import loginImage from "@/renderer/assets/login-img.png";
import { useAuthStore } from "@/renderer/stores/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [isLoginProcessing, setIsLoginProcessing] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleLogin = async () => {
    if (isLoginProcessing) {
      return;
    }
    setIsLoginProcessing(true);
    let succeeded = false;

    try {
      const { user } = await window.api.auth.loginWithGoogle();
      setUser(user);
      succeeded = true;

      navigate(ROUTES.HISTORY);
    } catch (error) {
      console.error("[login] start failed:", error);
    } finally {
      if (!succeeded) {
        setIsLoginProcessing(false);
      }
    }
  };

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
              disabled={isLoginProcessing}
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
