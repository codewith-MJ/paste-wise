import { useNavigate } from "react-router-dom";
import ROUTES from "@/shared/constants/routes";
import GoogleLoginButton from "./GoogleLoginButton";
import TitleBlock from "./TitleBlock";
import SkipLinkButton from "./SkipLinkButton";
import FeatureList from "./FeatureList";
import loginImage from "@/renderer/assets/login-img.png";

function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // TO-DO : Login 로직 추가
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
            <GoogleLoginButton onClick={handleGoogleLogin} />
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
