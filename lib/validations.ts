import { z } from 'zod';

export const createPaymentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  asset: z.enum(['ETH', 'USDT'], {
    errorMap: () => ({ message: 'Asset must be ETH or USDT' })
  }),
  chain: z.enum(['ethereum', 'polygon', 'bsc'], {
    errorMap: () => ({ message: 'Chain must be ethereum, polygon, or bsc' })
  }),
  note: z.string().optional(),
  expiresIn: z.number().min(5).max(1440).default(60), // 5 minutes to 24 hours
  fiatDisplay: z.string().default('USD'),
});

export const paymentStatusSchema = z.enum(['NEW', 'PENDING', 'PAID', 'EXPIRED', 'CANCELED']);

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
