type ContactRequest = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, subject, message } = (req.body ?? {}) as ContactRequest
  if (!name || !email || !subject || !message) return res.status(400).json({ error: 'All fields are required' })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Email service is not configured' })

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio contact <onboarding@resend.dev>',
      to: ['vaishnavrj1032@gmail.com'],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  })

  if (!response.ok) return res.status(502).json({ error: 'Unable to send email' })
  return res.status(200).json({ ok: true })
}
