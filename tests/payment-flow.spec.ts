import { test, expect } from '@playwright/test';

test.describe('Payment Flow', () => {
  test('should create a payment and display payment page', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Click on "Create Payment" button
    await page.click('text=Create Payment');
    
    // Fill out the payment form
    await page.fill('input[type="number"]', '100');
    await page.selectOption('select', 'USDT');
    await page.selectOption('select:nth-of-type(2)', 'ethereum');
    await page.selectOption('select:nth-of-type(3)', '60');
    await page.fill('input[placeholder*="description"]', 'Test payment');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to payment page
    await page.waitForURL(/\/pay\/[a-zA-Z0-9]+/);
    
    // Verify payment page elements
    await expect(page.locator('h1')).toContainText('Payment Request');
    await expect(page.locator('text=100 USDT')).toBeVisible();
    await expect(page.locator('text=Ethereum Network')).toBeVisible();
    
    // Verify payment address is displayed
    const addressElement = page.locator('text=/^0x[a-fA-F0-9]{40}$/');
    await expect(addressElement).toBeVisible();
    
    // Verify QR code is displayed
    await expect(page.locator('canvas')).toBeVisible();
    
    // Verify copy button works
    await page.click('text=Copy Address');
    await expect(page.locator('text=Copied')).toBeVisible();
    
    // Verify timer is displayed
    await expect(page.locator('text=Time remaining')).toBeVisible();
  });

  test('should display dashboard with payments', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');
    
    // Verify dashboard elements
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('text=Create New Payment')).toBeVisible();
    
    // Check if payments table exists (might be empty)
    const table = page.locator('table');
    if (await table.isVisible()) {
      await expect(table).toBeVisible();
    } else {
      // If no payments, should show empty state
      await expect(page.locator('text=No payments yet')).toBeVisible();
    }
  });

  test('should handle payment creation form validation', async ({ page }) => {
    await page.goto('/payments/new');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Should show validation error for required amount field
    await expect(page.locator('input[type="number"]')).toHaveAttribute('required');
    
    // Fill invalid amount
    await page.fill('input[type="number"]', '-10');
    await page.click('button[type="submit"]');
    
    // Should not submit with negative amount
    await expect(page.locator('input[type="number"]')).toHaveValue('-10');
  });

  test('should display payment status correctly', async ({ page }) => {
    // Mock a payment response
    await page.route('**/api/payments/*', async route => {
      const mockPayment = {
        success: true,
        payment: {
          id: 'test-payment-id',
          amount: 100,
          asset: 'USDT',
          chain: 'ethereum',
          payAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
          status: 'NEW',
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          txHash: null,
          confirmations: null,
          networkTxUrl: null,
          note: 'Test payment',
          createdAt: new Date().toISOString(),
          payUrl: 'http://localhost:3000/pay/test-payment-id'
        }
      };
      await route.fulfill({ json: mockPayment });
    });

    await page.goto('/pay/test-payment-id');
    
    // Verify payment details are displayed
    await expect(page.locator('text=100 USDT')).toBeVisible();
    await expect(page.locator('text=Waiting for payment')).toBeVisible();
    await expect(page.locator('text=Test payment')).toBeVisible();
  });

  test('should handle expired payment', async ({ page }) => {
    // Mock an expired payment
    await page.route('**/api/payments/*', async route => {
      const mockPayment = {
        success: true,
        payment: {
          id: 'expired-payment-id',
          amount: 100,
          asset: 'USDT',
          chain: 'ethereum',
          payAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
          status: 'EXPIRED',
          expiresAt: new Date(Date.now() - 3600000).toISOString(),
          txHash: null,
          confirmations: null,
          networkTxUrl: null,
          note: 'Expired payment',
          createdAt: new Date().toISOString(),
          payUrl: 'http://localhost:3000/pay/expired-payment-id'
        }
      };
      await route.fulfill({ json: mockPayment });
    });

    await page.goto('/pay/expired-payment-id');
    
    // Verify expired payment is displayed correctly
    await expect(page.locator('text=Payment Expired')).toBeVisible();
    await expect(page.locator('text=This payment request has expired')).toBeVisible();
  });

  test('should handle paid payment', async ({ page }) => {
    // Mock a paid payment
    await page.route('**/api/payments/*', async route => {
      const mockPayment = {
        success: true,
        payment: {
          id: 'paid-payment-id',
          amount: 100,
          asset: 'USDT',
          chain: 'ethereum',
          payAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
          status: 'PAID',
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          confirmations: 2,
          networkTxUrl: 'https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          note: 'Paid payment',
          createdAt: new Date().toISOString(),
          payUrl: 'http://localhost:3000/pay/paid-payment-id'
        }
      };
      await route.fulfill({ json: mockPayment });
    });

    await page.goto('/pay/paid-payment-id');
    
    // Verify paid payment is displayed correctly
    await expect(page.locator('text=Payment Confirmed!')).toBeVisible();
    await expect(page.locator('text=Your payment has been successfully processed')).toBeVisible();
    await expect(page.locator('text=View on Explorer')).toBeVisible();
  });
});
