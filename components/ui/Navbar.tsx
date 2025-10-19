import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-card/70 border-b border-border backdrop-blur-md">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-text font-semibold text-lg">Crypto Gateway</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="btn-ghost btn-sm">
                Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" className="btn-ghost btn-sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/payments/new">
              <Button className="btn-primary btn-sm">
                Create Payment
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
