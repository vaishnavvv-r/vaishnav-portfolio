document.addEventListener('submit', async event => {
  const form = event.target
  if (!(form instanceof HTMLFormElement) || !form.classList.contains('contact-form')) return

  event.preventDefault()
  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea'))
  const [name, email, subject, message] = fields.map(field => field.value)
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const status = document.createElement('small')
  status.className = 'form-note'
  status.textContent = 'Sending message...'
  form.querySelector('.form-note')?.remove()
  form.append(status)
  if (button) button.disabled = true

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    })
    if (!response.ok) throw new Error('Request failed')
    form.reset()
    status.textContent = 'Message sent successfully. Thanks for reaching out!'
    if (button) button.textContent = 'Message sent'
  } catch {
    status.textContent = 'Could not send the message. Please email vaishnavrj1032@gmail.com directly.'
    if (button) button.disabled = false
  }
}, true)
