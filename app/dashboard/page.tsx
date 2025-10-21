'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CopyButton } from '@/components/ui/CopyButton';
import { PaymentCard } from '@/components/ui/PaymentCard';
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
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

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

  // Filter payments based on selected filter
  const filteredPayments = payments.filter(payment => {
    switch (filter) {
      case 'paid':
        return payment.status === 'PAID';
      case 'pending':
        return payment.status === 'PENDING' || payment.status === 'NEW';
      default:
        return true;
    }
  });

  // Calculate stats
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidCount = payments.filter(p => p.status === 'PAID').length;
  const pendingCount = payments.filter(p => p.status === 'PENDING' || p.status === 'NEW').length;

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
      <div className="flex justify-between items-center mb-8">
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

      {/* Minimal Stats Card */}
      {payments.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-text mb-1">{payments.length}</div>
                <div className="text-sm text-muted">Total Payments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{paidCount}</div>
                <div className="text-sm text-muted">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{pendingCount}</div>
                <div className="text-sm text-muted">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Filters */}
      {payments.length > 0 && (
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({payments.length})
          </Button>
          <Button
            variant={filter === 'paid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('paid')}
          >
            Paid ({paidCount})
          </Button>
          <Button
            variant={filter === 'pending' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingCount})
          </Button>
        </div>
      )}

      <Card>
        <CardHeader>
          <h2 className="h2">
            {filter === 'all' ? 'All Payments' : 
             filter === 'paid' ? 'Completed Payments' : 'Pending Payments'}
          </h2>
        </CardHeader>
        <CardContent>
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <div className="badge w-16 h-16 mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <p className="sub mb-6">
                {payments.length === 0 ? 'No payments yet' : `No ${filter} payments found`}
              </p>
              <Link href="/payments/new">
                <Button className="btn-primary btn-lg">
                  {payments.length === 0 ? 'Create your first payment' : 'Create New Payment'}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
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
                    {filteredPayments.map((payment) => (
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
                          <div className="flex gap-2">
                            <Link href={`/payments/${payment.id}`}>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </Link>
                            <CopyButton text={`${typeof window !== 'undefined' ? window.location.origin : ''}/pay/${payment.id}`} size="sm">
                              Copy Link
                            </CopyButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {filteredPayments.map((payment) => (
                  <PaymentCard
                    key={payment.id}
                    payment={payment}
                    getStatusVariant={getStatusVariant}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
