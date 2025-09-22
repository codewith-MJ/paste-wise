type Props = {
  version: string;
};

function VersionFooter({ version }: Props) {
  return (
    <footer className="absolute bottom-6 text-xs text-slate-400">
      PasteWise v{version}
    </footer>
  );
}

export default VersionFooter;
