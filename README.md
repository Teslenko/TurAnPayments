# Crypto Payment Gateway

Минимальный, но продуманный крипто-платёжный шлюз для приёма платежей в криптовалютах.

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка окружения
```bash
cp .env.example .env
# Отредактируйте .env файл с вашими API ключами
```

### 3. Запуск базы данных
```bash
docker-compose up -d
```

### 4. Настройка БД
```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Запуск приложения
```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 📱 Использование

1. **Создание платежа**: Перейдите на главную страницу → "Create Payment"
2. **Оплата**: Откройте ссылку для оплаты → скопируйте адрес или отсканируйте QR код
3. **Дашборд**: Просмотр всех созданных платежей и их статусов

## ⚠️ Важно

- Используйте **тестовые сети** для разработки (Goerli, Mumbai, BSC Testnet)
- Не используйте продакшн мнемонику в разработке
- Настройте API ключи Alchemy/Infura для работы с блокчейном
- Это MVP версия - для продакшена требуется дополнительная безопасность

## 🛠 Технологии

- Next.js 14 + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- ethers.js для работы с EVM
- Playwright для тестов

## 🌐 Деплой на Vercel

### Переменные окружения

Настройте следующие переменные в настройках проекта Vercel:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Blockchain RPC URLs
ALCHEMY_ETH_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
ALCHEMY_POLYGON_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
ALCHEMY_BSC_URL=https://bsc-dataseed.binance.org/

# USDT Token Addresses
USDT_ETH_ADDRESS=0xdAC17F958D2ee523a2206206994597C13D831ec7
USDT_POLYGON_ADDRESS=0xc2132D05D31c914a87C6611C10748AEb04B58e8F
USDT_BSC_ADDRESS=0x55d398326f99059fF775485246999027B3197955

# HD Wallet
MNEMONIC="your twelve word mnemonic phrase"

# Configuration
PAYMENT_FEE_PCT=0.5
PAYMENT_EXPIRY_MINUTES=30
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### База данных

Рекомендуется использовать:
- [Supabase](https://supabase.com/) (бесплатный тариф доступен)
- [Neon](https://neon.tech/) (бесплатный тариф доступен)
- [Railway](https://railway.app/)

После создания базы данных запустите миграции:
```bash
npx prisma db push
```

### Деплой

1. Пушните код в GitHub
2. Импортируйте репозиторий в Vercel
3. Настройте переменные окружения
4. Деплой произойдет автоматически

Подробные инструкции см. в [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)