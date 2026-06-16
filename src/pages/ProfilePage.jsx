import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ERROR_MESSAGES } from '../utils/errorMessages';
import { sanitizeInput } from '../utils/sanitize';

function ProfilePage() {
  const { email, token, isAuthenticated } = useAuth();
  const [todoStats, setTodoStats] = useState({ total: 0, completed: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError('');

        const options = {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        };

        const response = await fetch('/api/tasks', options);

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        const todos = data.tasks ?? [];

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({ total, completed, active });
      } catch {
        setError(ERROR_MESSAGES.loadStats);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;

  const displayName = sanitizeInput(email) || 'User';
  const initials = displayName.charAt(0).toUpperCase();
  const lastActivity = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="bg-gray-50 px-6 py-10 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-2xl">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-[#4F46E5]">
              {initials}
            </div>
            {isAuthenticated && (
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
            )}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">{displayName}</h1>

          {isAuthenticated && (
            <span className="mt-2 flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Logged in
            </span>
          )}
        </div>

        {/* User Information card */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-[#4F46E5]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className="font-bold text-gray-900">User Information</h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Email Address</p>
              <p className="mt-1 font-semibold text-gray-900">{displayName}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Workspace Role</p>
              <p className="mt-1 font-semibold text-gray-900">Member</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Last Activity</p>
              <p className="mt-1 font-semibold text-gray-900">Today, {lastActivity}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Account Status</p>
              <p className="mt-1 font-semibold text-gray-900">
                {isAuthenticated ? 'Active' : 'Not logged in'}
              </p>
            </div>
          </div>
        </div>

        {/* Todo Statistics card */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-[#4F46E5]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
              </div>
              <h2 className="font-bold text-gray-900">Todo Statistics</h2>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
              Last 30 Days
            </span>
          </div>

          {loading && <p className="mt-6 text-sm text-gray-500">Loading statistics...</p>}
          {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

          {!loading && !error && (
            <>
              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Completion Rate
                    </p>
                    <p className="mt-1 text-4xl font-bold text-[#4F46E5]">{completionPercentage}%</p>
                  </div>
                  <p className="text-sm text-gray-400">Target: 85%</p>
                </div>

                <div className="mt-4 h-3 w-full rounded-full bg-indigo-100">
                  <div
                    className="h-3 rounded-full bg-[#4F46E5] transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-indigo-50 p-4 text-center">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{todoStats.total}</p>
                </div>
                <div className="rounded-xl bg-indigo-50 p-4 text-center">
                  <p className="text-sm text-green-600">Completed</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{todoStats.completed}</p>
                </div>
                <div className="rounded-xl bg-indigo-50 p-4 text-center">
                  <p className="text-sm text-[#4F46E5]">Active</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{todoStats.active}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
