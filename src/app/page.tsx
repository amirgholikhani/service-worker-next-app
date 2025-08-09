import { ServiceWorkerTest } from "@/components/ServiceWorkerTest";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-5">
        <Link className="font-bold text-info" href="/users">Users page</Link>
        <Link className="font-bold text-warning" href="/products">Products page</Link>
      </div>

      <ServiceWorkerTest />
    </main>
  );
}