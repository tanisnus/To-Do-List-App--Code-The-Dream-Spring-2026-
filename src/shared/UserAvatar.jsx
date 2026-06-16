import { sanitizeInput } from '../utils/sanitize';

const SIZE_STYLES = {
  sm: 'h-8 w-8 text-sm font-medium bg-indigo-200',
  lg: 'h-24 w-24 text-3xl font-bold bg-indigo-100',
};

export default function UserAvatar({
  name,
  size = 'sm',
  showOnlineStatus = false,
  onClick,
}) {
  const displayName = sanitizeInput(name);
  const initials = displayName ? displayName.charAt(0).toUpperCase() : '?';
  const sizeClass = SIZE_STYLES[size];
  const baseClass = `flex items-center justify-center rounded-full text-[#4F46E5] ${sizeClass}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClass} cursor-pointer hover:bg-indigo-300 transition-colors`}
        aria-label="Go to profile"
      >
        {initials}
      </button>
    );
  }

  return (
    <div className="relative">
      <div className={baseClass}>{initials}</div>
      {showOnlineStatus && (
        <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
      )}
    </div>
  );
}
