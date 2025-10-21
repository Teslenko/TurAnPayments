'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme-toggle';
import { WalletConnectModal } from '@/components/ui/WalletConnectModal';

export function Navbar() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-card/70 border-b border-border backdrop-blur-md">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-gray-900 dark:text-text font-semibold text-lg">Crypto Gateway</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="btn-ghost btn-sm text-gray-900 dark:text-text">
                Home
              </Button>
            </Link>
            <Link href="/how-to-pay">
              <Button variant="ghost" className="btn-ghost btn-sm text-gray-900 dark:text-text">
                Как оплачивать
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="btn-ghost btn-sm text-gray-900 dark:text-text">
                Мой кабинет
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" className="btn-ghost btn-sm text-gray-900 dark:text-text">
                Мои платежи
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="btn-outline btn-sm"
              onClick={() => setIsWalletModalOpen(true)}
            >
              Подключить кошелек
            </Button>
            <Link href="/payments/new">
              <Button className="btn-primary btn-sm">
                Create Payment
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Wallet Connect Modal */}
      <WalletConnectModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </nav>
  );
}
