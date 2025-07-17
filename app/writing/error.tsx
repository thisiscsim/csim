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
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-500 mb-4">An error occurred while loading the writing page.</p>
        <button
          onClick={reset}
          className="rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
