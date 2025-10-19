import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  primary: 'btn-primary',
  secondary: 'bg-card/80 border border-border text-text hover:bg-card focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg transition-all duration-200 rounded-xl shadow-md',
  outline: 'border border-border bg-card/80 text-text hover:bg-card focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg backdrop-blur-sm transition-all duration-200',
  ghost: 'text-muted hover:text-text hover:bg-card/50 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg transition-all duration-200',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
