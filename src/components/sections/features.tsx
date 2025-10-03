import {Shield, Zap, Puzzle, Globe2, Receipt, WalletMinimal} from "lucide-react";

const items = [
    {icon:<Shield/>,  title:"Non-custodial",  text:"Кошельки у мерчанта, мы не храним средства."},
    {icon:<Zap/>,     title:"Webhooks",       text:"Надёжные уведомления о статусах платежей."},
    {icon:<Receipt/>, title:"Invoices",       text:"Счета, виджеты и кнопки в два клика."},
    {icon:<Puzzle/>,  title:"Plugins",        text:"Готовые плагины для CMS и SDK."},
    {icon:<Globe2/>,  title:"Multi-chain",    text:"BTC, ETH, USDT и десятки монет/сетей."},
    {icon:<WalletMinimal/>, title:"Payouts",  text:"Массовые выплаты и конвертация."}
];

export default function Features() {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-6">Возможности</h2>
                <div className="grid md:grid-cols-3 gap-5">
                    {items.map(i=>(
                        <div key={i.title} className="rounded-2xl border p-5 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition">
                            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center mb-3">{i.icon}</div>
                            <div className="font-medium">{i.title}</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{i.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
