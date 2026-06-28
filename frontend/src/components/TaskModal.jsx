export default function TaskModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 p-6 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-slate-400 hover:text-white"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}