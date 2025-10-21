import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function ProfilePage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="h1 mb-4">Мой кабинет</h1>
          <p className="sub">Управление профилем и настройками</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <h2 className="h2">Информация профиля</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted">Email</label>
                  <p className="text-text">user@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted">Статус</label>
                  <div className="mt-1">
                    <Badge variant="success">Активен</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted">Дата регистрации</label>
                  <p className="text-text">21 октября 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connected Wallets */}
          <Card>
            <CardHeader>
              <h2 className="h2">Подключенные кошельки</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <div className="badge w-16 h-16 mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-muted mb-4">Кошельки не подключены</p>
                  <Button className="btn-primary">
                    Подключить кошелек
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <h2 className="h2">Настройки</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email уведомления</p>
                    <p className="text-sm text-muted">Получать уведомления о платежах</p>
                  </div>
                  <Button variant="outline" size="sm">Включить</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Тёмная тема</p>
                    <p className="text-sm text-muted">Автоматическое переключение</p>
                  </div>
                  <Button variant="outline" size="sm">Настроить</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h2 className="h2">Быстрые действия</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    📊 Мои платежи
                  </Button>
                </Link>
                <Link href="/payments/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    💳 Создать платёж
                  </Button>
                </Link>
                <Link href="/how-to-pay" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    📚 Как оплачивать
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
