type ToneBadgeProps = {
  toneName: string;
};

function ToneBadge({ toneName }: ToneBadgeProps) {
  return (
    <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
      {toneName}
    </span>
  );
}

export default ToneBadge;
