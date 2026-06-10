import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
  const { email, token } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    async function fetchTodoStats() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('/api/tasks', {
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todo statistics');
        }

        const data = await response.json();
        const tasks = data.tasks ?? [];

        setStats({
          total: tasks.length,
          completed: tasks.filter((todo) => todo.isCompleted).length,
          active: tasks.filter((todo) => !todo.isCompleted).length,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  return (
    <div>
      <h1>Profile</h1>

      <section>
        <h2>User Information</h2>
        <p>Name: {email}</p>
      </section>

      <section>
        <h2>Todo Statistics</h2>
        {isLoading && <p>Loading statistics...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && (
          <ul>
            <li>Total todos: {stats.total}</li>
            <li>Completed todos: {stats.completed}</li>
            <li>Active todos: {stats.active}</li>
          </ul>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
