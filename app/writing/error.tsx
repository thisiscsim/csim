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
    <div className="min-h-dvh flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="fg-muted mb-4 transition-colors duration-300">
          An error occurred while loading the writing page.
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-interactive px-4 py-2 fg-base hover:opacity-80 transition-all duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
