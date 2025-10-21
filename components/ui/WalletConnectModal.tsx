'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  if (!isOpen) return null;

  const wallets = [
    {
      id: 'hot',
      name: 'HOT Wallet',
      icon: '🔥',
      description: 'Recent',
      isRecent: true,
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Most popular wallet',
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Secure & trusted',
    },
    {
      id: 'other',
      name: 'Other wallets',
      icon: '📁',
      description: 'More options',
      hasArrow: true,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text">Log in or sign up</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted hover:text-text"
          >
            ✕
          </Button>
        </div>

        {/* Logo */}
        <div className="p-6 text-center">
          <div className="text-2xl font-bold text-text mb-2">
            Trady <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">BETA</span>
          </div>
        </div>

        {/* Wallet Options */}
        <div className="px-6 pb-6">
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet.id)}
                disabled={selectedWallet === wallet.id}
                className="w-full p-4 rounded-lg border border-border hover:bg-card/50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div>
                      <div className="font-medium text-text">{wallet.name}</div>
                      <div className="text-sm text-muted">{wallet.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {wallet.isRecent && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        Recent
                      </span>
                    )}
                    {wallet.hasArrow && (
                      <span className="text-muted">→</span>
                    )}
                    {selectedWallet === wallet.id && (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted">
            <span>Protected by</span>
            <span className="font-semibold">privy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
