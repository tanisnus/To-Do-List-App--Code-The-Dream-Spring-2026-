import Navigation from './Navigation';
import Logoff from '../features/Logoff';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { isAuthenticated } = useAuth();

    return (
        <header className="grid grid-cols-3 items-center px-8 py-4 bg-indigo-50">
            <h1 className="text-[#4F46E5] font-bold text-lg">TaskFlow</h1>
            <Navigation />
            <div className="flex justify-end">
                {isAuthenticated && <Logoff />}
            </div>
        </header>
    );
}

export default Header;
