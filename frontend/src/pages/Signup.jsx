import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-slate-900 p-8 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-white">Create your account</h1>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <input
          className="w-full rounded-lg bg-slate-800 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

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
          minLength={6}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}