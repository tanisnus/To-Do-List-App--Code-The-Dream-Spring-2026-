import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function navLinkClass({ isActive }, variant) {
  const base =
    variant === 'mobile'
      ? 'block rounded-lg px-3 py-2 text-sm font-medium transition-colors'
      : 'pb-1 text-sm font-medium transition-colors';
  const active =
    variant === 'mobile'
      ? 'bg-indigo-100 text-[#4F46E5] font-bold'
      : 'border-b-2 border-[#4F46E5] font-bold text-[#4F46E5]';
  const inactive = 'text-gray-600 hover:text-gray-900';

  return `${base} ${isActive ? active : inactive}`;
}

function Navigation({ variant = 'desktop', onNavigate }) {
  const { isAuthenticated } = useAuth();
  const isMobile = variant === 'mobile';

  const linkProps = (to) => ({
    to,
    className: (state) => navLinkClass(state, variant),
    onClick: onNavigate,
  });

  return (
    <nav className={isMobile ? '' : 'flex justify-center'}>
      <ul
        className={
          isMobile
            ? 'm-0 flex list-none flex-col gap-1 p-0'
            : 'm-0 flex list-none flex-wrap justify-center gap-4 p-0 lg:gap-8'
        }
      >
        <li>
          <NavLink {...linkProps('/about')}>About</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink {...linkProps('/todos')}>Todos</NavLink>
            </li>
            <li>
              <NavLink {...linkProps('/profile')}>Profile</NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink {...linkProps('/login')}>Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
