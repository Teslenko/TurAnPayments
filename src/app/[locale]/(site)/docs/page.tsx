import Container from "@/components/container";
export default function DocsPage() {
  return (
    <Container>
      <h1 className="text-2xl font-semibold">Documentation</h1>
      <pre className="mt-4 rounded-lg border p-4 bg-gray-50 text-sm overflow-x-auto">
POST /v1/invoices
{`{ "amount": 49.99, "currency": "USDT", "network": "TRON" }`}

# Webhook HMAC-SHA256
X-YourPay-Signature: &lt;signature&gt;
      </pre>
    </Container>
  );
}
