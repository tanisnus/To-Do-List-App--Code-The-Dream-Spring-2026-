import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { sanitizeInput } from '../utils/sanitize';

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

    const displayName = sanitizeInput(email);
    const initials = displayName ? displayName.charAt(0).toUpperCase() : '?';

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
            <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200 text-sm font-medium text-[#4F46E5] cursor-pointer hover:bg-indigo-300 transition-colors"
                aria-label="Go to profile"
            >
                {initials}
            </button>
        </div>
    );
}

export default Logoff;
