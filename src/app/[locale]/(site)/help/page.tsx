import Container from "@/components/container";
export default function HelpPage() {
  return (
    <Container>
      <h1 className="text-2xl font-semibold">FAQ</h1>
      <details className="mt-4 rounded-lg border p-4">
        <summary className="font-medium">Как принять первый платёж?</summary>
        <div className="mt-2 text-gray-700">Создайте инвойс и отправьте ссылку клиенту.</div>
      </details>
    </Container>
  );
}
