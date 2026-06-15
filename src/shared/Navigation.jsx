import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function navLinkClass({ isActive }) {
  const base = 'pb-1 text-sm font-medium transition-colors';
  const active = 'text-[#4F46E5] font-bold border-b-2 border-[#4F46E5]';
  const inactive = 'text-gray-600 hover:text-gray-900';

  return `${base} ${isActive ? active : inactive}`;
}

function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="flex justify-center">
      <ul className="flex list-none gap-8 p-0 m-0">
        <li>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/todos" className={navLinkClass}>
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
