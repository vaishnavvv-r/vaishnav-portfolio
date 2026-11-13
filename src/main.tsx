import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './certifications.css'
import './experience.css'
import './contact-form'
import './profile.css'
import './phone.css'
import './phone-contact'
import App from './App'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
