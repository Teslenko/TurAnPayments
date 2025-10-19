'use client';

import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export function CopyButton({ text, className, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        className
      )}
    >
      {children || text}
      {copied ? (
        <CheckIcon className="w-4 h-4 text-green-600" />
      ) : (
        <ClipboardIcon className="w-4 h-4" />
      )}
    </button>
  );
}
