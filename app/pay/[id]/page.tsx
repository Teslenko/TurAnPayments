'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CopyButton } from '@/components/ui/CopyButton';
import { QRCodeComponent } from '@/components/ui/QRCode';
import { Timer } from '@/components/ui/Timer';
import { Button } from '@/components/ui/Button';
import { formatAmount } from '@/lib/crypto';
import { Decimal } from '@prisma/client/runtime/library';

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

export default function PayPage() {
  const params = useParams();
  const paymentId = params.id as string;
  
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPaid, setUserPaid] = useState(false);

  useEffect(() => {
    if (paymentId) {
      fetchPayment();
      // Poll for updates every 10 seconds
      const interval = setInterval(fetchPayment, 10000);
      return () => clearInterval(interval);
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

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'Waiting for payment';
      case 'PENDING':
        return 'Payment received, waiting for confirmations';
      case 'PAID':
        return 'Payment confirmed';
      case 'EXPIRED':
        return 'Payment expired';
      default:
        return status;
    }
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
        </div>
      </div>
    );
  }

  const isExpired = payment.status === 'EXPIRED';
  const isPaid = payment.status === 'PAID';
  const isPending = payment.status === 'PENDING';

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment Request</h1>
          {payment.note && (
            <p className="text-gray-600 mt-2">{payment.note}</p>
          )}
        </div>

        <Card className="mb-6">
          <CardContent className="text-center py-8">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatAmount(new Decimal(payment.amount), payment.asset)}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {payment.chain.charAt(0).toUpperCase() + payment.chain.slice(1)} Network
            </div>
            
            <Badge variant={getStatusVariant(payment.status) as any} className="mb-4">
              {getStatusMessage(payment.status)}
            </Badge>

            {payment.expiresAt && !isPaid && (
              <Timer 
                expiresAt={new Date(payment.expiresAt)} 
                onExpire={() => fetchPayment()}
                className="mt-4"
              />
            )}
          </CardContent>
        </Card>

        {!isPaid && !isExpired && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-lg font-semibold">Payment Address</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Send exactly this amount to:</p>
                    <div className="font-mono text-sm break-all bg-white p-3 rounded border">
                      {payment.payAddress}
                    </div>
                    <div className="mt-3">
                      <CopyButton text={payment.payAddress}>
                        Copy Address
                      </CopyButton>
                    </div>
                  </div>

                  <div className="text-center">
                    <QRCodeComponent 
                      value={payment.payAddress} 
                      size={200}
                      className="mb-4"
                    />
                    <p className="text-sm text-gray-600">
                      Scan QR code with your wallet
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-lg font-semibold">How to Pay</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Open your wallet</p>
                      <p className="text-sm text-gray-600">
                        Use MetaMask, Trust Wallet, or any compatible wallet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Send payment</p>
                      <p className="text-sm text-gray-600">
                        Send exactly {formatAmount(new Decimal(payment.amount), payment.asset)} to the address above
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Wait for confirmation</p>
                      <p className="text-sm text-gray-600">
                        Payment will be confirmed automatically after 2 network confirmations
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center py-6">
                <p className="text-gray-600 mb-4">
                  Already sent the payment?
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setUserPaid(true)}
                  disabled={userPaid}
                >
                  {userPaid ? 'Payment marked as sent' : 'I have sent the payment'}
                </Button>
                {userPaid && (
                  <p className="text-sm text-green-600 mt-2">
                    Thank you! We'll confirm your payment shortly.
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {isPaid && (
          <Card>
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Confirmed!</h2>
              <p className="text-gray-600 mb-4">
                Your payment has been successfully processed.
              </p>
              {payment.txHash && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Transaction Hash:</p>
                  <div className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                    {payment.txHash}
                  </div>
                  {payment.networkTxUrl && (
                    <a 
                      href={payment.networkTxUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-primary-600 hover:text-primary-700 text-sm"
                    >
                      View on Explorer →
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {isExpired && (
          <Card>
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Expired</h2>
              <p className="text-gray-600">
                This payment request has expired. Please contact the merchant for a new payment link.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
