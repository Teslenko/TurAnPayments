import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const variantStyles = {
  default: 'bg-card/80 text-text border border-border',
  success: 'bg-green-900/50 text-green-300 border border-green-700/30',
  warning: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/30',
  error: 'bg-red-900/50 text-red-300 border border-red-700/30',
  info: 'bg-blue-900/50 text-blue-300 border border-blue-700/30',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
