import { useEffect, useMemo, useState } from 'react';
import { fetchPrioritizedTasks } from '../api/aiApi';

const PRIORITY_STYLES = {
  high: 'bg-red-500/10 text-red-400 ring-red-500/30',
  medium: 'bg-amber-500/10 text-amber-400 ring-amber-500/30',
  low: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30',
};

function PriorityBadge({ level }) {
  const style = PRIORITY_STYLES[level] || PRIORITY_STYLES.medium;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
      {level || 'medium'}
    </span>
  );
}

function formatDeadline(deadline) {
  if (!deadline) return 'No deadline';
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return 'No deadline';
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AIPrioritizedTaskList({ tasks = [] }) {
  const [rankedTasks, setRankedTasks] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const activeTasks = useMemo(() => tasks.filter((t) => t.status !== 'completed'), [tasks]);

  const tasksKey = useMemo(
    () => JSON.stringify(activeTasks.map((t) => [t._id, t.title, t.deadline, t.priority])),
    [activeTasks]
  );

  useEffect(() => {
    if (activeTasks.length === 0) {
      setRankedTasks([]);
      setStatus('idle');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setErrorMessage('');

    fetchPrioritizedTasks(activeTasks)
      .then((result) => {
        if (cancelled) return;
        setRankedTasks(result);
        setStatus('success');
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMessage(err.response?.data?.message || err.message || 'Something went wrong.');
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksKey]);

  const tasksById = useMemo(() => {
    const map = new Map();
    activeTasks.forEach((t) => map.set(String(t._id), t));
    return map;
  }, [activeTasks]);

  return (
    <section className="w-full rounded-xl bg-slate-900 p-4">
      <header className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">AI-prioritized order</h2>
          <p className="text-xs text-slate-400">Ranked by deadline and importance</p>
        </div>
        {status === 'loading' && <span className="text-xs font-medium text-slate-500">Ranking…</span>}
      </header>

      {status === 'idle' && activeTasks.length === 0 && (
        <p className="py-6 text-center text-sm text-slate-400">Add a task to see it prioritized here.</p>
      )}

      {status === 'loading' && (
        <ul className="space-y-3 animate-pulse" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="h-16 rounded-lg bg-slate-800" />
          ))}
        </ul>
      )}

      {status === 'error' && (
        <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <p className="font-medium">Couldn't rank these tasks.</p>
          <p className="mt-0.5 text-red-400/80">{errorMessage}</p>
        </div>
      )}

      {status === 'success' && rankedTasks.length === 0 && (
        <p className="py-6 text-center text-sm text-slate-400">No ranking returned. Try again.</p>
      )}

      {status === 'success' && rankedTasks.length > 0 && (
        <ol className="space-y-2">
          {rankedTasks.map((rt) => {
            const original = tasksById.get(String(rt._id));
            if (!original) return null;
            return (
              <li
                key={rt._id}
                className="flex items-start gap-3 rounded-lg bg-slate-800/60 px-3 py-3 transition hover:bg-slate-800"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {rt.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium text-white">{original.title}</p>
                    <PriorityBadge level={rt.suggestedPriority} />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">{formatDeadline(original.deadline)}</p>
                  {rt.reason && <p className="mt-1 text-xs italic text-slate-500">{rt.reason}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}