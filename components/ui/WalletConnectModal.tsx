'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  // Debug: log when modal is rendered
  console.log('WalletConnectModal: isOpen =', isOpen);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render anything if modal is not open
  if (!isOpen) {
    console.log('WalletConnectModal: Not rendering because isOpen is false');
    return null;
  }

  const wallets = [
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '/icons/wallets/walletconnect.svg',
      description: 'Connect any wallet',
    },
    {
      id: 'binance',
      name: 'Binance Wallet',
      icon: '/icons/wallets/binance.svg',
      description: 'Binance ecosystem',
    },
    {
      id: 'trust',
      name: 'Trust Wallet',
      icon: '/icons/wallets/trust.svg',
      description: 'Secure & trusted',
    },
    {
      id: 'hot',
      name: 'HOT Wallet',
      icon: '/icons/wallets/hot.svg',
      description: 'Recent',
      isRecent: true,
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '/icons/wallets/metamask.svg',
      description: 'Most popular wallet',
    },
  ];

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
    // Here you would integrate with actual wallet connection logic
    console.log('Connecting to wallet:', walletId);
    
    // Simulate connection delay
    setTimeout(() => {
      onClose();
      setSelectedWallet(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ minHeight: '100vh' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform translate-y-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 sticky top-0 bg-card z-10">
          <div></div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted hover:text-text hover:bg-card/50 rounded-full p-2 transition-all duration-200"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Logo and Title */}
        <div className="px-6 pb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-text">Connect with Aster</h2>
        </div>

        {/* Email Login */}
        <div className="px-6 pb-4">
          <button className="w-full p-4 rounded-lg bg-card/50 border border-border hover:bg-card/70 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="font-medium text-text">Log in with email</div>
            </div>
          </button>
        </div>

        {/* Wallet Options */}
        <div className="px-6 pb-4">
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet.id)}
                disabled={selectedWallet === wallet.id}
                className="w-full p-4 rounded-lg bg-card/30 border border-border hover:bg-card/50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="font-medium text-text">{wallet.name}</div>
                  {selectedWallet === wallet.id && (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <button className="w-full p-4 rounded-lg bg-card/30 border border-border hover:bg-card/50 transition-colors text-left mb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📁</div>
              <div className="font-medium text-text">View all wallets</div>
            </div>
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-muted hover:text-text w-full"
          >
            Cancel
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm text-muted mt-4">
            <span>Protected by</span>
            <span className="font-semibold">privy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
