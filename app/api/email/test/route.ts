import { NextRequest, NextResponse } from 'next/server'
import { sendTestEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { to } = await request.json()
    if (!to) {
      return NextResponse.json({ error: 'Missing to' }, { status: 400 })
    }
    const { data, error } = await sendTestEmail(to)
    if (error) return NextResponse.json({ error }, { status: 500 })
    return NextResponse.json({ ok: true, id: (data as any)?.id })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}


