import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-background text-center p-6">
      <h1 className="text-5xl font-serif text-foreground mb-4">Page not found</h1>
      <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
