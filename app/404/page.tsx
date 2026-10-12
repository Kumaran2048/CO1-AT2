import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-5 text-slate-950">
      <section className="text-center">
        <p className="text-8xl font-bold tracking-tight text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-8 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Back to login
        </Link>
      </section>
    </main>
  )
}
