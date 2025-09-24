type ModeBadgesProps = {
  modeTitle: string;
};

function ModeBadges({ modeTitle }: ModeBadgesProps) {
  return (
    <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
      {modeTitle}
    </span>
  );
}

export default ModeBadges;
