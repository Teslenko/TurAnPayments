import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createPaymentSchema } from '@/lib/validations';
import { HDWallet } from '@/lib/crypto';
import { generatePaymentUrl } from '@/lib/utils';
import { Decimal } from '@prisma/client/runtime/library';

// Глобальный экземпляр HD кошелька
let hdWallet: HDWallet | null = null;

function getHDWallet(): HDWallet {
  if (!hdWallet) {
    const mnemonic = process.env.MNEMONIC;
    if (!mnemonic) {
      throw new Error('MNEMONIC environment variable is required');
    }
    hdWallet = new HDWallet(mnemonic);
  }
  return hdWallet;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPaymentSchema.parse(body);

    // Получаем текущий курс (для демонстрации используем фиксированный)
    const fiatRate = 2000; // USD за ETH/USDT
    const feePct = parseFloat(process.env.PAYMENT_FEE_PCT || '0.5');

    // Генерируем новый адрес
    const wallet = getHDWallet();
    const { address, index } = wallet.getNextAddress();

    // Вычисляем комиссию и общую сумму
    const amount = new Decimal(validatedData.amount);
    const fee = amount.mul(feePct / 100);
    const total = amount.add(fee);

    // Вычисляем время истечения
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + validatedData.expiresIn);

    // Получаем адрес токена для USDT
    const tokenAddress = validatedData.asset === 'USDT' 
      ? process.env[`USDT_${validatedData.chain.toUpperCase()}_ADDRESS`]
      : null;

    // Создаем платеж в БД
    const payment = await prisma.payment.create({
      data: {
        asset: validatedData.asset,
        chain: validatedData.chain,
        amount: total,
        fiatCurrency: validatedData.fiatDisplay,
        fiatRate: new Decimal(fiatRate),
        feePct: new Decimal(feePct),
        derivedIndex: index,
        payAddress: address,
        tokenAddress,
        expiresAt,
        status: 'NEW',
        note: validatedData.note,
      },
    });

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: total.toNumber(),
        asset: payment.asset,
        chain: payment.chain,
        payAddress: payment.payAddress,
        expiresAt: payment.expiresAt,
        payUrl: generatePaymentUrl(payment.id),
      },
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      payments: payments.map(payment => ({
        id: payment.id,
        createdAt: payment.createdAt,
        amount: payment.amount.toNumber(),
        asset: payment.asset,
        chain: payment.chain,
        status: payment.status,
        expiresAt: payment.expiresAt,
        txHash: payment.txHash,
      })),
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}
