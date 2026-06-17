import { useState } from 'react';
import Navigation from './Navigation';
import Logoff from '../features/Logoff';
import { useAuth } from '../contexts/AuthContext';

function MenuIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function Header() {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="bg-indigo-50">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-8">
        <h1 className="shrink-0 text-lg font-bold text-[#4F46E5]">TaskFlow</h1>

        <div className="hidden flex-1 md:block">
          <Navigation />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isAuthenticated && (
            <div className="hidden md:block">
              <Logoff />
            </div>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-indigo-100 hover:text-gray-900 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-indigo-100 px-4 pb-4 pt-3 md:hidden">
          <Navigation variant="mobile" onNavigate={closeMenu} />
          {isAuthenticated && (
            <div className="mt-4 border-t border-indigo-100 pt-4">
              <Logoff />
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
