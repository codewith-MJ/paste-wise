type Props = {
  version: string;
};

function Footer({ version }: Props) {
  return (
    <footer className="absolute bottom-6 text-xs text-slate-400">
      PasteWise v{version}
    </footer>
  );
}

export default Footer;
