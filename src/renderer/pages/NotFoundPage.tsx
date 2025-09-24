import { useNavigate } from "react-router-dom";
import ROUTES from "@/shared/constants/routes";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HISTORY, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="mx-auto max-w-md px-6 text-center">
        <div className="mb-4 text-8xl font-bold text-blue-500">404</div>

        <h1 className="mb-3 text-2xl font-semibold text-slate-800">
          페이지를 찾을 수 없습니다
        </h1>

        <p className="mb-8 leading-relaxed text-slate-600">
          요청하신 페이지가 존재하지 않거나
          <br />
          이동되었을 수 있습니다.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={handleGoHome}
            className="cursor-pointer rounded-lg bg-blue-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-600"
          >
            홈으로 가기
          </button>
        </div>

        <div className="mt-12 text-xs text-slate-400">PasteWise</div>
      </div>
    </div>
  );
}

export default NotFoundPage;
