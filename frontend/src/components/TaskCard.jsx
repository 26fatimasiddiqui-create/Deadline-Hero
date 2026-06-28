export default function TaskCard({ task, onDelete, onToggleComplete }) {
  const hoursLeft =
    (new Date(task.deadline) - new Date()) / (1000 * 60 * 60);

  const urgent =
    hoursLeft < 24 && task.status !== "completed";

  const priorityColor = {
    low: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    high: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  }[task.priority];

  return (
    <div
      className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        urgent
          ? "border-rose-500/40 bg-rose-950/20"
          : "border-slate-800 bg-slate-900 hover:border-indigo-500/40"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 text-sm text-slate-400">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${priorityColor}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-slate-800"></div>

      {/* Footer */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Deadline
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {new Date(task.deadline).toLocaleString()}
          </p>

          {urgent && (
            <p className="mt-1 text-xs font-medium text-rose-400">
              ⚠ {Math.max(0, Math.round(hoursLeft))} hour(s) left
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggleComplete(task)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              task.status === "completed"
                ? "bg-emerald-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {task.status === "completed"
              ? "Completed ✓"
              : "Complete"}
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-600 hover:text-white"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}