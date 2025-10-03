import "@/styles/globals.css";
import Header from '@/components/header';
import Footer from "@/components/footer"; // ← вот этого импорта не хватало
import { NextIntlClientProvider, getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={inter.className + " min-h-screen flex flex-col bg-slate-50"}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Header variant="dashboard" />
            <main className="flex-1 max-w-6xl mx-auto p-6">{children}</main>
            <Footer /> {/* теперь компонент определён */}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
