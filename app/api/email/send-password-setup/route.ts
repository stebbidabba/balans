import { NextRequest, NextResponse } from 'next/server'
import { sendAccountSetupEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://balansisland.is'
    const signupLink = `${site}/signup?email=${encodeURIComponent(email)}`
    
    const res = await sendAccountSetupEmail(email, signupLink)
    if ((res as any).error) return NextResponse.json({ error: (res as any).error }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to send account setup email' }, { status: 500 })
  }
}


