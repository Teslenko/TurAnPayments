import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-wrap gap-6">
        <div>© {new Date().getFullYear()} YourPay</div>
        <Link href="/en/help/pricing">Pricing</Link>
        <Link href="/en/help/contact">Contact</Link>
        <Link href="/en/help/status">Status</Link>
      </div>
    </footer>
  );
}
