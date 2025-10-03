"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {LayoutDashboard, CreditCard} from "lucide-react";
import LocaleSwitcher from "@/components/locale-switcher";
import ThemeToggle from '@/components/ui/theme-toggle';

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
      <Link
          href={href}
          className={`rounded-lg px-3 py-2 text-sm ${
              active ? "bg-zinc-100 dark:bg-zinc-800/50 font-medium" : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:text-zinc-100"
          }`}
      >
        {label}
      </Link>
  );
}

export default function Header({ variant = "site" }: { variant?: "site" | "dashboard" }) {
  const t = useTranslations();                      // общий (brand, auth и т.п.)
  const tNav = useTranslations("navbar");           // navbar.*
  const tSol = useTranslations("solutions");        // solutions.*

  const locale = useLocale();
  const prefix = `/${locale}`;

  // Контент для дропдаунов (через переводы)
  const solutions = [
    { label: tSol("ecommerce"),   href: `${prefix}/solutions/ecommerce`,   icon: "🛒" },
    { label: tSol("token"),       href: `${prefix}/solutions/tge`,         icon: "🌱" },
    { label: tSol("casinos"),     href: `${prefix}/solutions/casinos`,     icon: "🎰" },
    { label: tSol("marketplace"), href: `${prefix}/solutions/marketplace`, icon: "🛍️" },
    { label: tSol("gaming"),      href: `${prefix}/solutions/gaming`,      icon: "🎮" },
    { label: tSol("saas"),        href: `${prefix}/solutions/saas`,        icon: "💻" },
    { label: tSol("adult"),       href: `${prefix}/solutions/adult`,       icon: "🔞" },
    { label: tSol("individuals"), href: `${prefix}/solutions/individuals`, icon: "👤" },
    { label: tSol("trading"),     href: `${prefix}/solutions/trading`,     icon: "📈" },
    { label: tSol("charity"),     href: `${prefix}/solutions/charity`,     icon: "💙" },
  ];

  const currencies1 = [
    { label: "Bitcoin",      href: `${prefix}/currencies/btc`,  icon: "₿",  note: "BTC"  },
    { label: "Ethereum",     href: `${prefix}/currencies/eth`,  icon: "◆",  note: "ETH"  },
    { label: "Tether",       href: `${prefix}/currencies/usdt`, icon: "💵", note: "USDT" },
    { label: "USD Coin",     href: `${prefix}/currencies/usdc`, icon: "💲", note: "USDC" },
    { label: "Binance Coin", href: `${prefix}/currencies/bnb`,  icon: "◎",  note: "BNB"  },
    { label: "Monero",       href: `${prefix}/currencies/xmr`,  icon: "🟠", note: "XMR"  },
  ];

  const currencies2 = [
    { label: "Polkadot",         href: `${prefix}/currencies/dot`,        icon: "⦿", note: "DOT" },
    { label: "TRON",             href: `${prefix}/currencies/trx`,        icon: "🧿", note: "TRX" },
    { label: "XRP",              href: `${prefix}/currencies/xrp`,        icon: "✕",  note: "XRP" },
    { label: "Stablecoins",      href: `${prefix}/currencies/stables`,    icon: "⚖️", note: "USDT/USDC/…" },
    { label: "List your token",  href: `${prefix}/currencies/list-token`, icon: "🧩" },
    { label: "All supported",    href: `${prefix}/currencies`,            icon: "📜" },
  ];

  const help1 = [
    { label: "FAQ",            href: `${prefix}/help`,         icon: "❓" },
    { label: "Fees & Pricing", href: `${prefix}/help/pricing`, icon: "💸" },
    { label: "Contact us",     href: `${prefix}/help/contact`, icon: "✉️" },
  ];

  const help2 = [
    { label: "Support", href: `${prefix}/help/support`, icon: "🛟" },
    { label: "Status",  href: `${prefix}/help/status`,  icon: "📶" },
    { label: "Docs",    href: `${prefix}/docs`,         icon: "📚" },
  ];

  // Простейший «ховер-дропдаун» без стейта
  const Dropdown = ({
                      label,
                      itemsLeft,
                      itemsRight,
                      align = "left",
                    }: {
    label: string;
    itemsLeft: { label: string; href: string; icon?: string; note?: string }[];
    itemsRight?: { label: string; href: string; icon?: string; note?: string }[];
    align?: "left" | "right";
  }) => (
      <div className="relative group">
        <button className="rounded-lg px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:text-zinc-100">
          {label}
        </button>
        <div
            className={`absolute hidden group-hover:block bg-white dark:bg-zinc-900 shadow-md p-4 mt-2 rounded min-w-[420px] ${
                align === "right" ? "right-0" : "left-0"
            }`}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              {itemsLeft.map((i) => (
                  <Link
                      key={i.href}
                      href={i.href}
                      className="flex items-center gap-2 rounded px-2 py-1 hover:bg-zinc-50"
                  >
                    <span>{i.icon}</span>
                    <span className="flex-1">{i.label}</span>
                    {i.note && <span className="text-xs text-zinc-500">{i.note}</span>}
                  </Link>
              ))}
            </div>
            {itemsRight && (
                <div className="flex flex-col">
                  {itemsRight.map((i) => (
                      <Link
                          key={i.href}
                          href={i.href}
                          className="flex items-center gap-2 rounded px-2 py-1 hover:bg-zinc-50"
                      >
                        <span>{i.icon}</span>
                        <span className="flex-1">{i.label}</span>
                        {i.note && <span className="text-xs text-zinc-500">{i.note}</span>}
                      </Link>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );

  return (
      <header className="sticky top-0 z-50 border-b bg-white dark:bg-zinc-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
          {/* Лого */}
          <Link href={prefix + "/"} className="font-semibold tracking-tight text-lg">
            {t("brand.name")}
          </Link>

          {/* Навигация */}
          <nav className="flex-1 text-sm hidden md:flex items-center gap-1">
            {variant === "site" ? (
                <>
                  <NavLink href={prefix + "/products"} label={tNav("products")} />

                  <Dropdown
                      label={tNav("solutions")}
                      itemsLeft={solutions.slice(0, 5)}
                      itemsRight={solutions.slice(5)}
                  />

                  <Dropdown
                      label={tNav("currencies")}
                      itemsLeft={currencies1}
                      itemsRight={currencies2}
                  />

                  <NavLink href={prefix + "/docs"} label={tNav("docs")} />

                  <Dropdown
                      label={tNav("help")}
                      itemsLeft={help1}
                      itemsRight={help2}
                      align="right"
                  />
                </>
            ) : (
                <>
                  <NavLink href={prefix + "/dashboard"} label={tNav("dashboard")} />
                  <NavLink href={prefix + "/dashboard/payments"} label={tNav("payments")} />
                  <NavLink href={prefix + "/dashboard/invoices"} label={tNav("invoices")} />
                  <NavLink href={prefix + "/dashboard/payouts"} label={tNav("payouts")} />
                  <NavLink href={prefix + "/dashboard/webhooks"} label={tNav("webhooks")} />
                </>
            )}
          </nav>

          {/* Правый блок */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <Link href={`${prefix}/auth/sign-in`} className="btn btn-ghost">
              {t("auth.signIn")}
            </Link>
            <Link href={`${prefix}/auth/sign-up`} className="btn btn-primary">
              {t("auth.getStarted")}
            </Link>
            <Link href={prefix + "/dashboard"} className="btn btn-outline">
              <LayoutDashboard size={16} /> {tNav("dashboard")}
            </Link>
            <Link href={prefix + "/products/invoice"} className="btn btn-primary">
              <CreditCard size={16} /> Оплатить
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
            {/* остальное */}
          </div>
        </div>
      </header>
  );
}
