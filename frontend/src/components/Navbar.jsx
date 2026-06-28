import { FiBell, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-sm text-slate-400">{today}</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2">
            <FiSearch className="text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>

          {/* Notification */}
          <button className="rounded-xl bg-slate-900 p-3 hover:bg-slate-800 transition">
            <FiBell className="text-white" size={18} />
          </button>

          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
            M
          </div>
        </div>
      </div>
    </header>
  );
}