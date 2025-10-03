import { redirect } from "next/navigation";

export default function Home() {
    redirect("/en");   // редирект сразу на английский
}
