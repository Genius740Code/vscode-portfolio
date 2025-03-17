'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-vscode-bg">
      <div className="max-w-xl p-6 bg-red-900/20 border border-red-500/30 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-4 text-red-300">{error.message || 'An unexpected error occurred'}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 ml-2 bg-vscode-sidebar text-white rounded hover:bg-vscode-sidebar-item transition-colors"
        >
          Reload page
        </button>
      </div>
    </div>
  );
} 