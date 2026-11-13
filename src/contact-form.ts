document.addEventListener('submit', event => {
  const form = event.target
  if (!(form instanceof HTMLFormElement) || !form.classList.contains('contact-form')) return

  event.preventDefault()
  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea'))
  const [name, email, subject, message] = fields.map(field => field.value)
  const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n')
  window.location.href = `mailto:vaishnavrj1032@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
