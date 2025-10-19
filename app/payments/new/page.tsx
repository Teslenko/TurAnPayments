'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

const assetOptions = [
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'USDT', label: 'Tether (USDT)' },
];

const chainOptions = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'polygon', label: 'Polygon' },
  { value: 'bsc', label: 'BSC' },
];

const expiresOptions = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '120', label: '2 hours' },
  { value: '480', label: '8 hours' },
  { value: '1440', label: '24 hours' },
];

export default function NewPaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    amount: '',
    asset: 'USDT',
    chain: 'ethereum',
    note: '',
    expiresIn: '60',
    fiatDisplay: 'USD',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          expiresIn: parseInt(formData.expiresIn),
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/pay/${data.payment.id}`);
      } else {
        setErrors({ general: data.error || 'Failed to create payment' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="h1 mb-4">Create Payment</h1>
          <p className="sub">Generate a payment link for your customer</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="h2">Payment Details</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <p className="text-red-400">{errors.general}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  error={errors.amount}
                  placeholder="0.00"
                  required
                />

                <Select
                  label="Asset"
                  value={formData.asset}
                  onChange={(e) => handleInputChange('asset', e.target.value)}
                  options={assetOptions}
                  error={errors.asset}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Network"
                  value={formData.chain}
                  onChange={(e) => handleInputChange('chain', e.target.value)}
                  options={chainOptions}
                  error={errors.chain}
                />

                <Select
                  label="Expires in"
                  value={formData.expiresIn}
                  onChange={(e) => handleInputChange('expiresIn', e.target.value)}
                  options={expiresOptions}
                  error={errors.expiresIn}
                />
              </div>

              <Input
                label="Note (optional)"
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                placeholder="Payment description or reference"
                error={errors.note}
              />

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h3 className="text-lg font-medium text-primary mb-3">Fee Information</h3>
                <p className="text-muted leading-relaxed">
                  A service fee of 0.5% will be added to the payment amount. 
                  The customer will pay the total amount including the fee.
                </p>
              </div>

              <div className="flex gap-6 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-lg flex-1"
                >
                  {loading ? 'Creating...' : 'Create Payment'}
                </Button>
                <Button
                  type="button"
                  onClick={() => router.back()}
                  className="btn-secondary btn-lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
