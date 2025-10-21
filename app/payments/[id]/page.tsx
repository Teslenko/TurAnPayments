'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CopyButton } from '@/components/ui/CopyButton';
import { Button } from '@/components/ui/Button';
import { formatAmount } from '@/lib/crypto';

interface Payment {
  id: string;
  amount: number;
  asset: string;
  chain: string;
  payAddress: string;
  status: string;
  expiresAt: string | null;
  txHash: string | null;
  confirmations: number | null;
  networkTxUrl: string | null;
  note: string | null;
  createdAt: string;
  payUrl: string;
}

export default function PaymentDetailsPage() {
  const params = useParams();
  const paymentId = params.id as string;
  
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (paymentId) {
      fetchPayment();
    }
  }, [paymentId]);

  const fetchPayment = async () => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`);
      const data = await response.json();
      
      if (data.success) {
        setPayment(data.payment);
        setError(null);
      } else {
        setError(data.error || 'Payment not found');
      }
    } catch (err) {
      setError('Failed to load payment');
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
      <div className="container py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading payment...</p>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Not Found</h1>
          <p className="text-gray-600">{error}</p>
          <Link href="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Details</h1>
            <p className="text-gray-600 mt-1">ID: {payment.id}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <Link href={payment.payUrl} target="_blank">
              <Button>View Payment Page</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Payment Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Amount</label>
                <p className="text-lg font-semibold">
                  {formatAmount(payment.amount, payment.asset)}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Network</label>
                <p className="text-sm">{payment.chain}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <Badge variant={getStatusVariant(payment.status) as any}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm">{formatDate(payment.createdAt)}</p>
              </div>
              
              {payment.expiresAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Expires</label>
                  <p className="text-sm">{formatDate(payment.expiresAt)}</p>
                </div>
              )}
              
              {payment.note && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Note</label>
                  <p className="text-sm">{payment.note}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Payment Address</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="font-mono text-sm break-all">{payment.payAddress}</p>
                  </div>
                  <div className="mt-2">
                    <CopyButton text={payment.payAddress}>
                      Copy Address
                    </CopyButton>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment URL</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm break-all">{payment.payUrl}</p>
                  </div>
                  <div className="mt-2">
                    <CopyButton text={payment.payUrl}>
                      Copy URL
                    </CopyButton>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {payment.txHash && (
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-lg font-semibold">Transaction Details</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Transaction Hash</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="font-mono text-sm break-all">{payment.txHash}</p>
                  </div>
                  <div className="mt-2">
                    <CopyButton text={payment.txHash}>
                      Copy Hash
                    </CopyButton>
                  </div>
                </div>
                
                {payment.confirmations !== null && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Confirmations</label>
                    <p className="text-sm">{payment.confirmations}</p>
                  </div>
                )}
                
                {payment.networkTxUrl && (
                  <div>
                    <a 
                      href={payment.networkTxUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700"
                    >
                      View on Explorer
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
