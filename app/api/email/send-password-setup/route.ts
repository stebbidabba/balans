import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'
import { sendPasswordSetupEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    const supabase = supabaseServer()
    // Generate a recovery link which lets the user set a password
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://balansisland.is'}/auth/callback?next=/account`
      }
    } as any)

    if (error || !data?.properties?.action_link) {
      return NextResponse.json({ error: error?.message || 'Failed to generate link' }, { status: 500 })
    }

    const link = (data as any).properties.action_link as string
    const res = await sendPasswordSetupEmail(email, link)
    if ((res as any).error) return NextResponse.json({ error: (res as any).error }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to send password setup email' }, { status: 500 })
  }
}


