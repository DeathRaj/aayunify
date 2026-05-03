export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-sand pb-28 pt-12 text-botanical-900">
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </div>
  );
}
