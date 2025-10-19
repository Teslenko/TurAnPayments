import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generatePaymentUrl } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount.toNumber(),
        asset: payment.asset,
        chain: payment.chain,
        payAddress: payment.payAddress,
        status: payment.status,
        expiresAt: payment.expiresAt,
        txHash: payment.txHash,
        confirmations: payment.confirmations,
        networkTxUrl: payment.networkTxUrl,
        note: payment.note,
        createdAt: payment.createdAt,
        payUrl: generatePaymentUrl(payment.id),
      },
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payment' },
      { status: 500 }
    );
  }
}
