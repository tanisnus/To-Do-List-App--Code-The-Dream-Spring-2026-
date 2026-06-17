function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 bg-indigo-50 min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-6xl font-bold text-[#4F46E5]">404</p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-3 text-sm text-gray-500">
          Sorry, the page you are looking for does not exist or may have been moved.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
