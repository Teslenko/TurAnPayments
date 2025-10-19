'use client';

import { useState, useEffect } from 'react';
import { formatTimeRemaining } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TimerProps {
  expiresAt: Date;
  onExpire?: () => void;
  className?: string;
}

export function Timer({ expiresAt, onExpire, className }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(formatTimeRemaining(expiresAt));
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = formatTimeRemaining(expiresAt);
      setTimeRemaining(remaining);
      
      if (remaining === 'Expired' && !isExpired) {
        setIsExpired(true);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire, isExpired]);

  return (
    <div className={cn('text-center', className)}>
      <div className={cn(
        'text-2xl font-bold',
        isExpired ? 'text-red-600' : 'text-gray-900'
      )}>
        {timeRemaining}
      </div>
      <div className="text-sm text-gray-500 mt-1">
        {isExpired ? 'Payment expired' : 'Time remaining'}
      </div>
    </div>
  );
}
