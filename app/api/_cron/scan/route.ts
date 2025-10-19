import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PaymentTracker } from '@/lib/crypto';
import { Decimal } from '@prisma/client/runtime/library';

export async function POST(request: NextRequest) {
  try {
    // Получаем все платежи со статусами NEW или PENDING
    const payments = await prisma.payment.findMany({
      where: {
        status: {
          in: ['NEW', 'PENDING']
        },
        expiresAt: {
          gt: new Date() // Не истекшие
        }
      }
    });

    const requiredConfirmations = parseInt(process.env.REQUIRED_CONFIRMATIONS || '2');
    let processedCount = 0;

    for (const payment of payments) {
      try {
        const tracker = new PaymentTracker(payment.chain);
        
        // Проверяем баланс адреса
        const balance = await tracker.getBalance(payment.payAddress, payment.asset);
        
        if (balance > 0) {
          // Получаем последние транзакции
          const transactions = await tracker.getRecentTransactions(
            payment.payAddress, 
            payment.asset
          );

          if (transactions.length > 0) {
            const latestTx = transactions[0];
            const confirmations = await tracker.getTransactionConfirmations(latestTx.hash);
            
            // Обновляем статус в зависимости от количества подтверждений
            let newStatus = payment.status;
            let txHash = payment.txHash;
            let networkTxUrl = payment.networkTxUrl;

            if (confirmations >= requiredConfirmations) {
              newStatus = 'PAID';
              txHash = latestTx.hash;
              networkTxUrl = tracker.getExplorerUrl(latestTx.hash);
            } else if (payment.status === 'NEW') {
              newStatus = 'PENDING';
              txHash = latestTx.hash;
              networkTxUrl = tracker.getExplorerUrl(latestTx.hash);
            }

            await prisma.payment.update({
              where: { id: payment.id },
              data: {
                status: newStatus,
                txHash,
                confirmations,
                networkTxUrl,
              },
            });

            processedCount++;
          }
        }
      } catch (error) {
        console.error(`Error processing payment ${payment.id}:`, error);
      }
    }

    // Помечаем истекшие платежи
    await prisma.payment.updateMany({
      where: {
        status: {
          in: ['NEW', 'PENDING']
        },
        expiresAt: {
          lte: new Date()
        }
      },
      data: {
        status: 'EXPIRED'
      }
    });

    return NextResponse.json({
      success: true,
      processed: processedCount,
      total: payments.length,
    });
  } catch (error) {
    console.error('Error in scan cron:', error);
    return NextResponse.json(
      { success: false, error: 'Scan failed' },
      { status: 500 }
    );
  }
}
