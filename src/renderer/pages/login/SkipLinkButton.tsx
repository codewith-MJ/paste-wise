type SkipLinkButtonProps = {
  onClick: () => void;
};

function SkipLinkButton({ onClick }: SkipLinkButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
    >
      로그인 없이 이용하기
    </button>
  );
}

export default SkipLinkButton;
