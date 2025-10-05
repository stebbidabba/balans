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
    from: 'Balans <info@balansisland.is>',
    to,
    subject: 'Hello from Balans',
    html: '<p>Congrats on sending your <strong>first email</strong> via Resend!</p>'
  })
}

export async function sendAccountSetupEmail(to: string, link: string) {
  const resend = getResend()
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;max-width:600px;margin:0 auto;padding:20px">
      <div style="text-align:center;margin-bottom:30px">
        <h1 style="color:#333;margin-bottom:10px">Welcome to Balans!</h1>
        <p style="color:#666;font-size:16px">Your order has been confirmed and your account is ready</p>
      </div>
      
      <div style="background:#f8f9fa;padding:20px;border-radius:10px;margin-bottom:20px">
        <h2 style="color:#333;margin-top:0">Your account is ready!</h2>
        <p style="color:#666;margin-bottom:20px">
          You can now access your account to view your order status and test results.
        </p>
        <div style="text-align:center">
          <a href="${link}" style="display:inline-block;background:#8A7CFF;color:#000;text-decoration:none;padding:15px 30px;border-radius:10px;font-weight:600;font-size:16px">
            Access Your Account
          </a>
        </div>
      </div>
      
      <div style="text-align:center;color:#999;font-size:14px">
        <p>If the button doesn't work, copy this link into your browser:</p>
        <p style="word-break:break-all;background:#f0f0f0;padding:10px;border-radius:5px;margin:10px 0">
          ${link}
        </p>
      </div>
    </div>
  `
  return await resend.emails.send({
    from: 'Balans <info@balansisland.is>',
    to,
    subject: 'Your Balans account is ready - Access your results',
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
    from: 'Balans <info@balansisland.is>',
    to,
    subject: 'Sign in to Balans',
    html
  })
}


