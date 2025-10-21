import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function HowToPayPage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="h1 mb-4">Как оплачивать криптовалютой</h1>
          <p className="sub mb-8">
            Подробное руководство по оплате товаров и услуг криптовалютами
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/payments/new">
              <Button className="btn-primary btn-lg">Создать платёж</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="btn-secondary btn-lg">Мой кабинет</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <h2 className="h2 flex items-center gap-3">
                <span className="badge w-10 h-10">📱</span>
                Мобильные кошельки
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="info">MetaMask</Badge>
                  <span className="text-sm">Самый популярный кошелёк</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="info">Trust Wallet</Badge>
                  <span className="text-sm">Простой и безопасный</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="info">Coinbase Wallet</Badge>
                  <span className="text-sm">От крупной биржи</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="h2 flex items-center gap-3">
                <span className="badge w-10 h-10">💻</span>
                Десктопные кошельки
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="info">MetaMask</Badge>
                  <span className="text-sm">Расширение для браузера</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="info">Phantom</Badge>
                  <span className="text-sm">Для Solana сети</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="info">Rabby</Badge>
                  <span className="text-sm">Альтернатива MetaMask</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <h2 className="h2">Пошаговая инструкция</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Получите ссылку на оплату</h3>
                  <p className="text-muted">
                    Продавец отправит вам ссылку вида: <code className="bg-gray-100 px-2 py-1 rounded text-sm">tur-an-payments.vercel.app/pay/abc123</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Откройте ссылку</h3>
                  <p className="text-muted">
                    Перейдите по ссылке в любом браузере. Вы увидите сумму к оплате, адрес кошелька и QR-код.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Скопируйте адрес или отсканируйте QR</h3>
                  <p className="text-muted">
                    Скопируйте адрес кошелька или отсканируйте QR-код в вашем кошельке.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Отправьте точную сумму</h3>
                  <p className="text-muted">
                    В кошельке отправьте <strong>точно указанную сумму</strong> на полученный адрес. 
                    Небольшие ошибки в сумме могут привести к потере средств.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Дождитесь подтверждения</h3>
                  <p className="text-muted">
                    Платеж будет автоматически подтверждён после получения 2 подтверждений в сети. 
                    Обычно это занимает 1-5 минут.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <h2 className="h2">Поддерживаемые криптовалюты</h2>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">₿</span>
                </div>
                <h3 className="font-semibold mb-2">Ethereum (ETH)</h3>
                <p className="text-sm text-muted">Основная валюта сети Ethereum</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💵</span>
                </div>
                <h3 className="font-semibold mb-2">USDT</h3>
                <p className="text-sm text-muted">Стейблкоин привязанный к доллару</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="font-semibold mb-2">Мультисеть</h3>
                <p className="text-sm text-muted">Ethereum, Polygon, BSC</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="h2">Часто задаваемые вопросы</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Сколько времени занимает оплата?</h3>
                <p className="text-muted">
                  Обычно 1-5 минут. Время зависит от загруженности сети и выбранной криптовалюты.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Что если я отправлю неправильную сумму?</h3>
                <p className="text-muted">
                  К сожалению, криптоплатежи необратимы. Всегда проверяйте сумму перед отправкой.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Безопасно ли это?</h3>
                <p className="text-muted">
                  Да, мы используем проверенные технологии блокчейна. Ваши средства защищены криптографией.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Могу ли я отменить платеж?</h3>
                <p className="text-muted">
                  Нет, криптоплатежи необратимы. Убедитесь в правильности адреса и суммы перед отправкой.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
