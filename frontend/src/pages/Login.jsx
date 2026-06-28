import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl bg-slate-900 p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <input
          type="email"
          className="w-full rounded-lg bg-slate-800 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="w-full rounded-lg bg-slate-800 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
        <p className="text-sm text-slate-400">
          No account? <Link to="/signup" className="text-indigo-400 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}