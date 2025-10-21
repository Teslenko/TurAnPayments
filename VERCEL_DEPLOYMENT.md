# Vercel Deployment Guide

## Prerequisites

1. PostgreSQL database (recommend using [Supabase](https://supabase.com/) or [Neon](https://neon.tech/) for free tier)
2. Alchemy API keys for blockchain RPC access
3. HD wallet mnemonic for address generation

## Environment Variables

Configure the following environment variables in Vercel:

### Required Variables

```bash
DATABASE_URL=postgresql://user:password@host:5432/database
MNEMONIC=your twelve word mnemonic phrase goes here
```

### Blockchain RPC URLs

```bash
ALCHEMY_ETH_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
ALCHEMY_POLYGON_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
ALCHEMY_BSC_URL=https://bsc-dataseed.binance.org/
```

### USDT Token Addresses

```bash
USDT_ETH_ADDRESS=0xdAC17F958D2ee523a2206206994597C13D831ec7
USDT_POLYGON_ADDRESS=0xc2132D05D31c914a87C6611C10748AEb04B58e8F
USDT_BSC_ADDRESS=0x55d398326f99059fF775485246999027B3197955
```

### Payment Configuration

```bash
PAYMENT_FEE_PCT=0.5
PAYMENT_EXPIRY_MINUTES=30
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Deployment Steps

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Fix Vercel deployment configuration"
   git push origin new-ui
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com/)
   - Import your GitHub repository
   - Select the `new-ui` branch

3. **Configure Environment Variables**

   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from the list above

4. **Database Setup**

   - Create a PostgreSQL database (Supabase/Neon recommended)
   - Run migrations:

     ```bash
     npx prisma db push
     ```

5. **Deploy**

   - Vercel will automatically deploy your application
   - The build process will:
     - Install dependencies
     - Generate Prisma Client
     - Build Next.js application

## Troubleshooting

### Prisma Client Generation Failed

If you see errors related to Prisma Client:

- Make sure `postinstall` script is in package.json
- Verify `DATABASE_URL` is set correctly
- Check that Prisma schema is valid

### Module Not Found Errors

If you see "Module not found" for Node.js modules:

- Ensure you're not importing Prisma Client in client components
- Use `'use client'` directive only where necessary
- Import Prisma only in API routes and server components

## Post-Deployment

After successful deployment:

1. Test the payment creation API: `POST /api/payments`
2. Verify database connection
3. Check that blockchain RPC URLs are working
4. Set up cron job for payment scanning (if needed)

## Notes

- This application uses Next.js App Router
- API routes are serverless functions
- Prisma Client is generated at build time
- Static assets are served from Vercel CDN

