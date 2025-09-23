import { FcGoogle } from "react-icons/fc";

type GoogleLoginButtonProps = {
  onClick: () => void;
};

function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-700"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
        <FcGoogle className="h-4 w-4" />
      </span>
      <span>Continue with Google</span>
    </button>
  );
}

export default GoogleLoginButton;
