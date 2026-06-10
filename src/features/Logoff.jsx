import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

function Logoff() {
    const { logout } = useAuth();
    const [logoutError, setLogoutError] = useState('');
    const [isLoggingOff, setIsLoggingOff] = useState(false);
    const navigate = useNavigate();  // Added this navigation hook

    async function handleLogout() {
        setIsLoggingOff(true);
        setLogoutError('');

        const result = await logout();

        if (result.success) {
            navigate('/login');  // Added this navigation
          } else {
            setError(result.error);
            setIsLoggingOff(false);
          }
    }

    return (
        <div>
            {logoutError && <p>{logoutError}</p>}
            <button type="button" onClick={handleLogout} disabled={isLoggingOff}>
                {isLoggingOff ? 'Logging out...' : 'Log Out'}
            </button>
        </div>
    );
}

export default Logoff;
