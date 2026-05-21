export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-full p-6 md:p-12">
      <div className="max-w-4xl w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
