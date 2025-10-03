'use client';

import Container from "@/components/container";
import Link from "next/link";
import {useTranslations, useLocale} from "next-intl";

// новые секции
import Brands from "@/components/sections/brands";
import Features from "@/components/sections/features";
import CtaBar from "@/components/sections/cta";

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tBtn  = useTranslations('buttons');
  const locale = useLocale();
  const prefix = `/${locale}`;

  return (
      <>
        {/* HERO */}
        <section className="bg-blob">
          <Container>
            <div className="mx-auto max-w-3xl text-center py-16 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs text-zinc-700">
              {tHero('badge')}
            </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
                {tHero('title')}
              </h1>
              <p className="mt-3 text-zinc-600 dark:text-zinc-300">{tHero('subtitle')}</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link href={`${prefix}/products`} className="btn btn-primary">
                  {tBtn('connect')}
                </Link>
                <Link href={`${prefix}/docs`} className="btn btn-outline">
                  {tBtn('docs')}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Логотипы доверия */}
        <Brands />

        {/* Ключевые фичи */}
        <Features />

        {/* Полоса с призывом к действию */}
        <CtaBar />
      </>
  );
}
