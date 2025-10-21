import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CopyButton } from '@/components/ui/CopyButton';

interface Payment {
  id: string;
  createdAt: string;
  amount: number;
  asset: string;
  chain: string;
  status: string;
  expiresAt: string | null;
  txHash: string | null;
}

interface PaymentCardProps {
  payment: Payment;
  getStatusVariant: (status: string) => string;
  formatDate: (dateString: string) => string;
}

export function PaymentCard({ payment, getStatusVariant, formatDate }: PaymentCardProps) {
  return (
    <div className="bg-card/50 border border-border rounded-lg p-4 hover:bg-card/80 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-mono text-sm text-text mb-1">
            {payment.id.slice(0, 8)}...
          </div>
          <div className="text-lg font-semibold text-text">
            {payment.amount} {payment.asset}
          </div>
        </div>
        <Badge variant={getStatusVariant(payment.status) as any}>
          {payment.status}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Network:</span>
          <span className="text-text">{payment.chain}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Created:</span>
          <span className="text-text">{formatDate(payment.createdAt)}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Link href={`/payments/${payment.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </Link>
        <CopyButton text={`${typeof window !== 'undefined' ? window.location.origin : ''}/pay/${payment.id}`} size="sm">
          Copy Link
        </CopyButton>
      </div>
    </div>
  );
}
