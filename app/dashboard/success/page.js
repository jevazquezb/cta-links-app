import Link from "next/link";

export default async function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-xl font-bold">Thanks for your purchase 💙</h1>
      <Link
        href="/dashboard"
        className="btn bg-[#5DA2D5] hover:bg-[#5294c6] text-white"
      >
        Dashboard
      </Link>
    </main>
  );
}
