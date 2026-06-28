export default function DashboardLayout({ sidebar, navbar, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        {/* Sidebar */}
        < aside className="w-64 shrink-0">
          {sidebar}
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {navbar}

          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}