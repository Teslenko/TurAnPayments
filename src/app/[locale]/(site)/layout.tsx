import type { Metadata } from "next";
import "@/styles/globals.css";
import header from "@/components/header";
import footer from "@/components/footer";
import { Inter } from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";
import Header from '@/components/header';
const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "YourPay — Crypto payments",
  description: "Accept crypto via API, invoices, buttons and widgets."
};

export default function SiteLayout({children}:{children:React.ReactNode}) {
    return (<>{/* шапка только для сайта */}
        <Header variant="site" />
        {children}
    </>);
}
