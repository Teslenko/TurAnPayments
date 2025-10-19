import { ethers } from 'ethers';
import { Decimal } from '@prisma/client/runtime/library';

export interface ChainConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  usdtAddress?: string;
}

export const CHAINS: Record<string, ChainConfig> = {
  ethereum: {
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: process.env.ALCHEMY_ETH_URL || '',
    explorerUrl: 'https://etherscan.io',
    usdtAddress: process.env.USDT_ETH_ADDRESS,
  },
  polygon: {
    name: 'Polygon',
    chainId: 137,
    rpcUrl: process.env.ALCHEMY_POLYGON_URL || '',
    explorerUrl: 'https://polygonscan.com',
    usdtAddress: process.env.USDT_POLYGON_ADDRESS,
  },
  bsc: {
    name: 'BSC',
    chainId: 56,
    rpcUrl: process.env.ALCHEMY_BSC_URL || '',
    explorerUrl: 'https://bscscan.com',
    usdtAddress: process.env.USDT_BSC_ADDRESS,
  },
};

export class HDWallet {
  private hdNode: ethers.HDNodeWallet;
  private currentIndex: number = 0;

  constructor(mnemonic: string) {
    this.hdNode = ethers.HDNodeWallet.fromMnemonic(ethers.Mnemonic.fromPhrase(mnemonic));
  }

  generateAddress(index: number): string {
    const derivedWallet = this.hdNode.derivePath(`m/44'/60'/0'/0/${index}`);
    return derivedWallet.address;
  }

  getNextAddress(): { address: string; index: number } {
    const address = this.generateAddress(this.currentIndex);
    const index = this.currentIndex;
    this.currentIndex++;
    return { address, index };
  }
}

export class PaymentTracker {
  private provider: ethers.JsonRpcProvider;
  private chain: ChainConfig;

  constructor(chainId: string) {
    this.chain = CHAINS[chainId];
    if (!this.chain) {
      throw new Error(`Unsupported chain: ${chainId}`);
    }
    this.provider = new ethers.JsonRpcProvider(this.chain.rpcUrl);
  }

  async getBalance(address: string, asset: string): Promise<bigint> {
    if (asset === 'ETH') {
      return await this.provider.getBalance(address);
    } else if (asset === 'USDT' && this.chain.usdtAddress) {
      const contract = new ethers.Contract(
        this.chain.usdtAddress,
        ['function balanceOf(address) view returns (uint256)'],
        this.provider
      );
      return await contract.balanceOf(address);
    }
    throw new Error(`Unsupported asset: ${asset}`);
  }

  async getTransactionConfirmations(txHash: string): Promise<number> {
    const tx = await this.provider.getTransaction(txHash);
    if (!tx) return 0;
    
    const receipt = await this.provider.getTransactionReceipt(txHash);
    if (!receipt) return 0;
    
    const currentBlock = await this.provider.getBlockNumber();
    return currentBlock - receipt.blockNumber + 1;
  }

  async getRecentTransactions(address: string, asset: string): Promise<Array<{
    hash: string;
    from: string;
    to: string;
    value: bigint;
    blockNumber: number;
    confirmations: number;
  }>> {
    // Для MVP используем простой подход - проверяем баланс
    // В продакшене нужно использовать события или API эксплорера
    const balance = await this.getBalance(address, asset);
    
    if (balance > 0) {
      // Возвращаем фиктивную транзакцию для демонстрации
      // В реальном приложении нужно отслеживать входящие транзакции
      return [{
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        from: '0x' + Math.random().toString(16).substr(2, 40),
        to: address,
        value: balance,
        blockNumber: await this.provider.getBlockNumber(),
        confirmations: 1
      }];
    }
    
    return [];
  }

  getExplorerUrl(txHash: string): string {
    return `${this.chain.explorerUrl}/tx/${txHash}`;
  }
}

export function formatAmount(amount: Decimal, asset: string): string {
  const value = amount.toNumber();
  if (asset === 'ETH') {
    return `${ethers.formatEther(value.toString())} ETH`;
  } else if (asset === 'USDT') {
    return `${value.toFixed(2)} USDT`;
  }
  return `${value} ${asset}`;
}

export function calculateFee(amount: Decimal, feePct: number): Decimal {
  return amount.mul(feePct / 100);
}

export function calculateTotal(amount: Decimal, feePct: number): Decimal {
  const fee = calculateFee(amount, feePct);
  return amount.add(fee);
}
