export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-navy-700 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Panel Administrativo</h1>
        </div>
      </div>
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
