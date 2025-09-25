type ToneBadgeProps = {
  toneTitle: string;
};

function ToneBadge({ toneTitle }: ToneBadgeProps) {
  return (
    <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
      {toneTitle}
    </span>
  );
}

export default ToneBadge;
