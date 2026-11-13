import { profile } from './data/profile'

const addPhoneLink = () => {
  const links = document.querySelector('.contact-links')
  if (!links || links.querySelector('.phone-inline')) return Boolean(links)

  const phone = document.createElement('a')
  phone.className = 'phone-inline'
  phone.href = `tel:${profile.phone}`
  phone.textContent = `Phone: ${profile.phone}`
  links.insertBefore(phone, links.children[1] ?? null)
  return true
}

if (!addPhoneLink()) {
  const observer = new MutationObserver(() => {
    if (addPhoneLink()) observer.disconnect()
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
