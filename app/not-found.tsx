import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-neutral-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
