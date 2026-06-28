import {
  FiHome,
  FiCheckSquare,
  FiBarChart2,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";


import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },
  {
    name: "Tasks",
    icon: FiCheckSquare,
    path: "/dashboard",
  },
  {
    name: "Analytics",
    icon: FiBarChart2,
    path: "/analytics",
  },
  {
    name: "Calendar",
    icon: FiCalendar,
    path: "/calendar",
  },
  {
    name: "Settings",
    icon: FiSettings,
    path: "/dashboard",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-indigo-400">
          Deadline Hero
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          AI Productivity Assistant
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                location.pathname === item.path
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-red-500 hover:text-white">
          <FiLogOut size={20} />
          Logout
        </button>
      </div>

    </div>
  );
}