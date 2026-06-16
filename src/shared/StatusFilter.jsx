import { useSearchParams } from 'react-router';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const handleStatusChange = (status) => {
    if (status === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', status);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex rounded-lg bg-indigo-50 p-1">
      {FILTERS.map(({ value, label }) => {
        const isActive = currentStatus === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => handleStatusChange(value)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-white text-[#4F46E5] shadow-sm'
                : 'text-gray-600 hover:text-gray-900 cursor-pointer'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default StatusFilter;
