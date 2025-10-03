type Payment = {
  id: string; amount: number; currency: string;
  status: "pending" | "confirmed" | "failed"; createdAt: string;
};
const payments: Payment[] = [
  { id: "inv_0001", amount: 49.99, currency: "USDT", status: "confirmed", createdAt: "2025-10-02 12:15" },
  { id: "inv_0002", amount: 120,   currency: "USDT", status: "pending",   createdAt: "2025-10-02 11:37" },
  { id: "inv_0003", amount: 0.003, currency: "BTC",  status: "failed",    createdAt: "2025-10-02 10:22" }
];
const StatusBadge = ({ s }: { s: Payment["status"] }) => {
  const map = { confirmed: "badge badge-green", pending: "badge badge-yellow", failed: "badge badge-red" } as const;
  const label = { confirmed: "Оплачен", pending: "Ожидает", failed: "Ошибка" }[s];
  return <span className={map[s]}>{label}</span>;
};
export default function DashboardHome() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Дашборд</h1>
        <p className="text-zinc-600 dark:text-zinc-300">Последние платежи, статус вебхуков, быстрые действия.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-5"><div className="text-sm text-zinc-500">Баланс</div><div className="text-2xl font-semibold mt-1">—</div></div>
        <div className="card p-5"><div className="text-sm text-zinc-500">Платежей сегодня</div><div className="text-2xl font-semibold mt-1">{payments.length}</div></div>
        <div className="card p-5"><div className="text-sm text-zinc-500">Webhook</div><div className="text-2xl font-semibold mt-1">ok</div></div>
      </div>
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b bg-zinc-50">Последние платежи</div>
        <table className="w-full text-sm">
          <thead className="text-left text-zinc-500"><tr>
            <th className="px-5 py-2">Invoice</th><th className="px-5 py-2">Сумма</th>
            <th className="px-5 py-2">Статус</th><th className="px-5 py-2">Создан</th>
          </tr></thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id} className="border-t">
                <td className="px-5 py-3 font-mono">{p.id}</td>
                <td className="px-5 py-3">{p.amount} {p.currency}</td>
                <td className="px-5 py-3"><StatusBadge s={p.status} /></td>
                <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">{p.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
