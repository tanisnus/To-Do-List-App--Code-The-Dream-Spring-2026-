function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>Sort by:</span>
      <div className="relative">
        <select
          id="sortBy"
          value={sortBy}
          onChange={onSortByChange}
          className="appearance-none rounded-md border-0 bg-transparent py-1 pl-0 pr-6 text-sm font-medium text-gray-900 focus:outline-none cursor-pointer"
        >
          <option value="createdAt">Creation Date</option>
          <option value="title">Title</option>
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-400">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
      <select
        id="sortDirection"
        value={sortDirection}
        onChange={onSortDirectionChange}
        className="hidden"
        aria-hidden="true"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}

export default SortBy;
