import Link from "next/link";
export default function CtaBar(){
    return (
        <section className="py-8 bg-gradient-to-r from-sky-50 to-emerald-50 border-t">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <div className="text-lg font-semibold">Готовы принимать криптоплатежи?</div>
                    <div className="text-zinc-600 dark:text-zinc-300 text-sm">Подключите TuranPayments за 10 минут — без кода или через API.</div>
                </div>
                <div className="flex gap-3">
                    <Link href="/en/products/invoice" className="btn btn-primary">Создать счёт</Link>
                    <Link href="/en/docs" className="btn btn-outline">Документация</Link>
                </div>
            </div>
        </section>
    );
}
