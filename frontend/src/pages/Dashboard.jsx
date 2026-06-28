import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AIPrioritizedTaskList from '../components/AIPrioritizedTaskList';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskModal from "../components/TaskModal";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    estimatedHours: 1,
  });

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
  console.error("Fetch Tasks Error:", err);
  console.error("Status:", err.response?.status);
  console.error("Response:", err.response?.data);

  setError(
    err.response?.data?.message ||
    JSON.stringify(err.response?.data) ||
    err.message
  );
} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setCreating(true);

      await api.post('/tasks', form);

      setForm({
        title: '',
        description: '',
        deadline: '',
        priority: 'medium',
        estimatedHours: 1,
      });

      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error('Create task error:', err);
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Delete task error:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const status = task.status === 'completed' ? 'in_progress' : 'completed';

      const { data } = await api.put(`/tasks/${task._id}`, { status });

      setTasks((prev) =>
        prev.map((item) => (item._id === data._id ? data : item))
      );
    } catch (err) {
      console.error('Update task error:', err);
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };


return (
  <DashboardLayout
    sidebar={<Sidebar />}
    navbar={<Navbar />}
  >
    <div className="mx-auto max-w-7xl">
<div className="mb-6 flex items-center justify-between">
  <div>
    <h2 className="text-3xl font-bold text-white">
      Hey, {user?.name}
    </h2>
    <p className="text-slate-400">
      Manage your tasks efficiently
    </p>
  </div>

  <button
    onClick={() => {
      setError("");
      setShowForm(!showForm);
    }}
    className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
  >
    {showForm ? "Cancel" : "+ Add Task"}
  </button>
</div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

<TaskModal
  open={showForm}
  onClose={() => setShowForm(false)}
>
  <form
    onSubmit={handleCreate}
    className="space-y-4"
  >
    <h2 className="text-2xl font-bold text-white">
      Create New Task
    </h2>

    <input
      type="text"
      placeholder="Task Title"
      value={form.title}
      onChange={(e) =>
        setForm({ ...form, title: e.target.value })
      }
      className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white"
      required
    />

    <textarea
      placeholder="Description"
      rows={4}
      value={form.description}
      onChange={(e) =>
        setForm({ ...form, description: e.target.value })
      }
      className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white"
    />

    <input
      type="datetime-local"
      value={form.deadline}
      onChange={(e) =>
        setForm({ ...form, deadline: e.target.value })
      }
      className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white"
      required
    />

    <select
      value={form.priority}
      onChange={(e) =>
        setForm({ ...form, priority: e.target.value })
      }
      className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <input
      type="number"
      value={form.estimatedHours}
      onChange={(e) =>
        setForm({
          ...form,
          estimatedHours: Number(e.target.value),
        })
      }
      className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white"
      min={1}
    />

    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="rounded-xl bg-slate-700 px-4 py-2"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={creating}
        className="rounded-xl bg-indigo-600 px-5 py-2"
      >
        {creating ? "Creating..." : "Create Task"}
      </button>
    </div>
  </form>
</TaskModal>
<div className="grid gap-5 mb-8 md:grid-cols-4">

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400 text-sm">Total Tasks</p>
    <h2 className="mt-2 text-3xl font-bold">
      {tasks.length}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400 text-sm">Completed</p>
    <h2 className="mt-2 text-3xl font-bold text-green-400">
      {tasks.filter(t => t.status === "completed").length}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400 text-sm">Pending</p>
    <h2 className="mt-2 text-3xl font-bold text-yellow-400">
      {tasks.filter(t => t.status !== "completed").length}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-800 p-6">
    <p className="text-slate-400 text-sm">Overdue</p>
    <h2 className="mt-2 text-3xl font-bold text-red-400">
      {
        tasks.filter(
          t =>
            t.status !== "completed" &&
            new Date(t.deadline) < new Date()
        ).length
      }
    </h2>
  </div>

</div>
 

      {!loading && tasks.length > 0 && (
        <div className="mb-6">
          <AIPrioritizedTaskList tasks={tasks} />
        </div>
      )}

      {loading ? (
        <p className="text-slate-400">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-slate-400">
          No tasks yet. Add one to get started.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}

    </div>
  </DashboardLayout>
);
}