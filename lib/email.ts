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
    from: 'Balans <onboarding@resend.dev>',
    to,
    subject: 'Hello from Balans',
    html: '<p>Congrats on sending your <strong>first email</strong> via Resend!</p>'
  })
}

export async function sendPasswordSetupEmail(to: string, link: string) {
  const resend = getResend()
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>Welcome to Balans</h2>
      <p>Finish setting up your account by creating a password.</p>
      <p>
        <a href="${link}" style="display:inline-block;background:#8A7CFF;color:#000;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:600">Create password</a>
      </p>
      <p>If the button doesn’t work, copy this link into your browser:<br />
      <span style="word-break:break-all;color:#555">${link}</span></p>
    </div>
  `
  return await resend.emails.send({
    from: 'Balans <onboarding@resend.dev>',
    to,
    subject: 'Create your Balans password',
    html
  })
}

export async function sendAccessLinkEmail(to: string, link: string) {
  const resend = getResend()
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>Access your Balans account</h2>
      <p>Click the button below to sign in securely. You can set a password from your account page.</p>
      <p>
        <a href="${link}" style="display:inline-block;background:#8A7CFF;color:#000;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:600">Sign in</a>
      </p>
      <p>If the button doesn’t work, copy this link into your browser:<br />
      <span style="word-break:break-all;color:#555">${link}</span></p>
    </div>
  `
  return await resend.emails.send({
    from: 'Balans <onboarding@resend.dev>',
    to,
    subject: 'Sign in to Balans',
    html
  })
}


