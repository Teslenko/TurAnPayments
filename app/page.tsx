import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { StatsCard } from '@/components/ui/StatsCard';

export default function HomePage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="h1 mb-6 text-glow">
          Crypto Payment Gateway
        </h1>
        <p className="sub mb-12 max-w-3xl mx-auto leading-relaxed">
          Accept cryptocurrency payments with ease. Simple, secure, and fast.
        </p>
        
        <div className="flex gap-6 justify-center mb-16">
          <Link href="/payments/new">
            <Button className="btn-primary btn-lg min-w-[160px]">
              Create Payment
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="btn-secondary btn-lg min-w-[160px]">
              Dashboard
            </Button>
          </Link>
          <Link href="/how-to-pay">
            <Button className="btn-outline btn-lg min-w-[160px]">
              Как оплачивать
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
        <StatsCard
          title="Всего платежей"
          value="1,247"
          description="За последний месяц"
          icon={<span className="text-primary text-xl">💳</span>}
          trend={{ value: "+12%", isPositive: true }}
        />
        <StatsCard
          title="Объём транзакций"
          value="$2.4M"
          description="В криптовалюте"
          icon={<span className="text-primary text-xl">💰</span>}
          trend={{ value: "+8%", isPositive: true }}
        />
        <StatsCard
          title="Активные пользователи"
          value="3,891"
          description="Уникальных кошельков"
          icon={<span className="text-primary text-xl">👥</span>}
          trend={{ value: "+15%", isPositive: true }}
        />
        <StatsCard
          title="Средняя комиссия"
          value="0.5%"
          description="За обработку платежа"
          icon={<span className="text-primary text-xl">⚡</span>}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        <Card className="group card-hover">
          <CardContent className="text-center p-6">
            <div className="badge w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text">Secure</h3>
            <p className="text-muted leading-relaxed">
              Your funds are protected with industry-standard security measures.
            </p>
          </CardContent>
        </Card>

        <Card className="group card-hover">
          <CardContent className="text-center p-6">
            <div className="badge w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text">Fast</h3>
            <p className="text-muted leading-relaxed">
              Receive payments instantly with blockchain technology.
            </p>
          </CardContent>
        </Card>

        <Card className="group card-hover">
          <CardContent className="text-center p-6">
            <div className="badge w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text">Simple</h3>
            <p className="text-muted leading-relaxed">
              Easy to use interface for both merchants and customers.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="h2 mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform duration-300">
              1
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text">Create Payment</h3>
            <p className="text-muted leading-relaxed">
              Generate a payment link with amount and cryptocurrency details.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg shadow-green-900/40 group-hover:scale-110 transition-transform duration-300">
              2
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text">Share Link</h3>
            <p className="text-muted leading-relaxed">
              Send the payment link to your customer via any channel.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold shadow-lg shadow-purple-900/40 group-hover:scale-110 transition-transform duration-300">
              3
            </div>
            <h3 className="text-xl font-semibold mb-4 text-text">Get Paid</h3>
            <p className="text-muted leading-relaxed">
              Receive instant notifications when payment is confirmed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
