import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Payment Gateway',
  description: 'Simple and secure cryptocurrency payment gateway for accepting ETH and USDT payments',
  keywords: ['crypto', 'payment', 'gateway', 'bitcoin', 'ethereum', 'usdt', 'blockchain'],
  authors: [{ name: 'TurAnPayments' }],
  creator: 'TurAnPayments',
  publisher: 'TurAnPayments',
  openGraph: {
    title: 'Crypto Payment Gateway',
    description: 'Accept cryptocurrency payments with ease',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Crypto Payment Gateway',
    description: 'Accept cryptocurrency payments with ease',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="page-wrap">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
