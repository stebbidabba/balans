import { Resend } from 'resend'

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY')
  }
  return new Resend(apiKey)
}

export async function sendTestEmail(to: string) {
  const resend = getResend()
  return await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Hello from Balans',
    html: '<p>Congrats on sending your <strong>first email</strong> via Resend!</p>'
  })
}


