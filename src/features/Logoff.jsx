import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import UserAvatar from '../shared/UserAvatar';

function Logoff() {
  const { logout, email } = useAuth();
  const [logoutError, setLogoutError] = useState('');
  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    setIsLoggingOff(true);
    setLogoutError('');

    const result = await logout();

    if (result.success) {
      navigate('/login');
    } else {
      setLogoutError(result.error);
      setIsLoggingOff(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {logoutError && <p className="text-sm text-red-600">{logoutError}</p>}
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOff}
        className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-transparent border-0 cursor-pointer disabled:opacity-50"
      >
        {isLoggingOff ? 'Logging out...' : 'Log Out'}
      </button>
      <UserAvatar name={email} onClick={() => navigate('/profile')} />
    </div>
  );
}

export default Logoff;
