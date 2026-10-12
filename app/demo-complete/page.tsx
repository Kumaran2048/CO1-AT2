import Link from 'next/link'
import { ArrowLeft, CheckCircle2, FileSpreadsheet } from 'lucide-react'

export default function DemoCompletePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] px-5 py-10 text-slate-950">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-12">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="size-8" /></div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-emerald-600">Demo complete</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Submission recorded</h1>
        <p className="mx-auto mt-4 max-w-sm leading-7 text-slate-600">The local route accepted your fictional values and discarded the original password after writing a safe summary.</p>
        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-left text-sm text-slate-600"><FileSpreadsheet className="size-5 shrink-0 text-indigo-600" /><span>Saved to <strong className="font-semibold text-slate-900">data/submissions.csv</strong></span></div>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"><ArrowLeft className="size-4" /> Return to demo login</Link>
      </section>
    </main>
  )
}
