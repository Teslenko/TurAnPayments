'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { cn } from '@/lib/utils';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCodeComponent({ value, size = 200, className }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }).catch((err) => {
        console.error('Error generating QR code:', err);
      });
    }
  }, [value, size]);

  return (
    <div className={cn('flex justify-center', className)}>
      <canvas ref={canvasRef} />
    </div>
  );
}
