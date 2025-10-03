import Container from "@/components/container";
import Link from "next/link";

const items = [
  { href: "api", title: "Development API", desc: "REST/Webhooks, ключи, подпись HMAC." },
  { href: "invoice", title: "Invoices", desc: "Счета-ссылки на оплату с таймером." },
  { href: "buttons", title: "Payment Button", desc: "Генератор кнопок с параметрами." },
  { href: "pos", title: "Point of Sale", desc: "QR-экран для офлайна." },
  { href: "plugins", title: "Plugins", desc: "WooCommerce / Shopify и др." },
  { href: "white-label", title: "White Label", desc: "Свой домен и брендинг." }
];

export default function ProductsPage({ params: {locale} }:{ params: {locale: string} }) {
  return (
    <Container>
      <h1 className="text-3xl font-semibold">Продукты</h1>
      <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(i => (
          <li key={i.href} className="card p-5">
            <h3 className="font-semibold">{i.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{i.desc}</p>
            <Link className="text-sm mt-3 inline-block" href={`/${locale}/products/` + i.href}>Подробнее →</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
