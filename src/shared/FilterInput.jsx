export default function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className="relative w-full max-w-xs">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </span>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(event) => onFilterChange(event.target.value)}
        placeholder="Search tasks..."
        className="w-full rounded-lg border border-indigo-200 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#4F46E5] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
      />
    </div>
  );
}
