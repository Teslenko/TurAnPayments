export default function Brands() {
    const logos = ['Visa','Mastercard','Shopify','Woo','Magento','Stripe']; // заглушки
    return (
        <section className="py-8 border-y bg-white dark:bg-zinc-900/60">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 opacity-70">
                {logos.map(l => (
                    <div key={l} className="text-center text-sm">{l}</div>
                ))}
            </div>
        </section>
    );
}
