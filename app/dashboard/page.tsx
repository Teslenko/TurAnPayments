'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

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

export default function DashboardPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments');
      const data = await response.json();
      if (data.success) {
        setPayments(data.payments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'EXPIRED':
      case 'CANCELED':
        return 'error';
      default:
        return 'info';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-muted text-lg">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="h1 mb-2">Dashboard</h1>
          <p className="sub">Manage your cryptocurrency payments</p>
        </div>
        <Link href="/payments/new">
          <Button className="btn-primary btn-md">
            Create New Payment
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <h2 className="h2">Recent Payments</h2>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-12">
              <div className="badge w-16 h-16 mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <p className="sub mb-6">No payments yet</p>
              <Link href="/payments/new">
                <Button className="btn-primary btn-lg">
                  Create your first payment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-card/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Network
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-border">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-card/30 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-text">
                        {payment.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text font-medium">
                        {payment.amount} {payment.asset}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                        {payment.chain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(payment.status) as any}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                        {formatDate(payment.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/payments/${payment.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
