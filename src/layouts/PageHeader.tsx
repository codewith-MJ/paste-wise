type PageHeaderProps = {
  title: string;
  description: string;
};

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </header>
  );
}

export default PageHeader;
