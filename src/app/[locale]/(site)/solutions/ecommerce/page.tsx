// src/app/[locale]/(site)/solutions/ecommerce/page.tsx
import Container from '@/components/container';

export default function Page() {
    return (
        <Container>
            <h1 className="text-2xl font-semibold">For e-commerce</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                Интеграция платежей для интернет-магазинов: инвойсы, кнопки, API, webhook’и...
            </p>
        </Container>
    );
}
