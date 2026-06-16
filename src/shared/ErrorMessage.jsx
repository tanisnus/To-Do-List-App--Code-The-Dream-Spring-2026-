export default function ErrorMessage({ message, children, className = 'mt-4' }) {
  if (!message) return null;

  return (
    <div className={`${className} rounded-lg bg-red-50 p-4 text-sm text-red-600`}>
      <p>{message}</p>
      {children}
    </div>
  );
}
