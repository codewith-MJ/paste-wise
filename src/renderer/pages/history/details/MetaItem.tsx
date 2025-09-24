type MetaItemProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function MetaItem({ label, children, className }: MetaItemProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="font-medium">{label}:</span>
      <span className="ml-1">{children}</span>
    </div>
  );
}

export default MetaItem;
