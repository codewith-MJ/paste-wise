import { FcGoogle } from "react-icons/fc";

type GoogleLoginButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

function GoogleLoginButton({ onClick, disabled }: GoogleLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-busy={disabled || undefined}
      className={[
        "flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-md transition-colors",
        "bg-blue-600 hover:bg-blue-700",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
      ].join(" ")}
    >
      {disabled ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
          <FcGoogle className="h-4 w-4" />
        </span>
      )}
      <span>{disabled ? "로그인 중..." : "Google 계정으로 로그인"}</span>
    </button>
  );
}

export default GoogleLoginButton;
