import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUpRight, ArrowUp, Check, Code2, BriefcaseBusiness, Mail, Menu, X, ExternalLink, Sparkles, Send, Terminal } from 'lucide-react'
import { profile, about, aboutMore } from './data/profile'
import { projects, Project } from './data/projects'
import { skillGroups } from './data/skills'
import { experience } from './data/experience'
import { certifications } from './data/certifications'
import { education } from './data/education'

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .55 } } }

function SectionLabel({ children, number }: { children: string; number: string }) { return <div className="section-label"><span>{number}</span><i />{children}</div> }
function ProjectVisual({ project }: { project: Project }) { return <div className={`project-visual ${project.accent}`}><span className="visual-grid" /><span className="visual-orb" /><span className="visual-lines" /><span className="visual-code">{project.accent === 'invoice' ? 'GST / JSON / XML' : project.accent === 'sentiment' ? 'positive · neutral · concern' : project.accent === 'crm' ? 'LEADS → INSIGHTS' : project.accent === 'chat' ? 'ASK / THINK / RESPOND' : project.accent === 'forge' ? 'BUILD → VALIDATE → SHIP' : 'OCR → LLM → STRUCTURE'}</span></div> }

function App() {
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('All')
  const [formSent, setFormSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [typed, setTyped] = useState('')
  const roles = ['Full Stack Developer', 'Python Developer', 'AI Enthusiast', 'Aspiring Product Engineer']
  const [roleIndex, setRoleIndex] = useState(0)
  const filtered = useMemo(() => active === 'All' ? projects : projects.filter(p => p.category === active), [active])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    let cursor = 0; let deleting = false
    const timer = window.setInterval(() => { const word = roles[roleIndex]; if (!deleting) { setTyped(word.slice(0, cursor + 1)); cursor++; if (cursor === word.length) { deleting = true; window.clearInterval(timer); window.setTimeout(() => setRoleIndex(i => (i + 1) % roles.length), 1500) } } }, 65)
    return () => window.clearInterval(timer)
  }, [roleIndex])
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }

  return <div className="app">
    <div className="noise" />
    <header className={scrolled ? 'nav scrolled' : 'nav'}><a className="brand" href="#top" onClick={() => scrollTo('top')}><span>V</span>R<span className="brand-dot">.</span></a><nav className={menu ? 'open' : ''}>{['About', 'Skills', 'Work', 'Certifications', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}</a>)}<a className="nav-cta" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></nav><button className="menu-btn" aria-label="Toggle navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></header>

    <main id="top">
      <section className="hero container"><div className="hero-copy"><motion.div initial="hidden" animate="visible" variants={reveal} className="eyebrow"><span className="status-dot" /> Open to opportunities <span className="eyebrow-line" /></motion.div><motion.h1 initial="hidden" animate="visible" variants={reveal}>Building intelligent<br /><em>products</em> through<br />code &amp; creativity.</motion.h1><motion.p initial="hidden" animate="visible" variants={reveal} className="hero-text">I'm a developer from Kerala passionate about building practical AI-powered solutions and full-stack applications. I turn complex ideas into useful products.</motion.p><motion.div initial="hidden" animate="visible" variants={reveal} className="hero-actions"><button className="button primary" onClick={() => scrollTo('work')}>View projects <ArrowDown size={16} /></button><a className="button ghost" href="/vaishnav-r-resume.pdf" download>Download resume <ArrowUpRight size={16} /></a></motion.div><div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn</a></div></div><div className="hero-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-terminal"><div className="terminal-top"><span /><span /><span /><small>vaishnav@workspace ~ %</small></div><div className="terminal-body"><div><b className="green">const</b> <span className="cyan">developer</span> = {'{'}</div><div className="indent">name: <span className="amber">'Vaishnav R'</span>,</div><div className="indent">role: <span className="amber">'{typed}<i className="caret" />'</span>,</div><div className="indent">focus: [<span className="amber">'AI'</span>, <span className="amber">'product'</span>],</div><div>{'}'}</div><div className="terminal-comment">// ship useful things</div></div></div><div className="hero-index">01 <span>/</span> 04</div></div></section>

      <section id="about" className="section container"><SectionLabel number="01">About me</SectionLabel><div className="about-grid"><div><h2>Curious by nature.<br /><span>Practical by default.</span></h2></div><div className="about-copy"><p>{about}</p><p>{aboutMore}</p><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">More about me <ArrowUpRight size={16} /></a></div></div><div className="stats">{profile.stats.map(s => <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div></section>

      <section id="skills" className="section container"><SectionLabel number="02">Toolkit</SectionLabel><div className="section-heading"><h2>Tools for the<br /><span>next build.</span></h2><p>A growing collection of technologies I use to think, build, and ship. Always learning, always refining.</p></div><div className="skills-grid">{skillGroups.map(group => <motion.div className="skill-card" key={group.label} whileHover={{ y: -5 }}><span className="skill-icon">{group.icon}</span><h3>{group.label}</h3><div className="tags">{group.items.map(i => <span key={i}>{i}</span>)}</div></motion.div>)}</div></section>

      <section className="section experience container"><SectionLabel number="03">Experience</SectionLabel><div className="experience-card"><div className="timeline-dot" /><div className="experience-meta"><span>{experience.duration}</span><span className="current">● Placeholder</span></div><h2>{experience.role}</h2><h3>{experience.company}</h3><p>{experience.description}</p><div className="experience-note"><Terminal size={16} /> Role details are intentionally editable until verified.</div></div></section>

      <section id="work" className="section container"><SectionLabel number="04">Selected work</SectionLabel><div className="section-heading projects-heading"><div><h2>Ideas made<br /><span>real.</span></h2></div><div><p>A selection of projects where curiosity met a real-world problem.</p><div className="filters">{['All', 'AI / ML', 'Full Stack', 'Developer Tools'].map(f => <button className={active === f ? 'active' : ''} onClick={() => setActive(f)} key={f}>{f}</button>)}</div></div></div><div className="projects-grid"><AnimatePresence mode="popLayout">{filtered.map((project, i) => <motion.article layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .35, delay: i * .04 }} className="project-card" key={project.title}><ProjectVisual project={project} /><div className="project-content"><div className="project-top"><span>{String(projects.indexOf(project) + 1).padStart(2, '0')}</span><span>{project.category}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub <ArrowUpRight size={14} /></a>{project.demo ? <a className="demo-link" href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Live demo <ArrowUpRight size={14} /></a> : <span className="no-demo">Demo not available</span>}</div></div></motion.article>)}</AnimatePresence></div></section>

      <section className="section credentials container"><div className="credential-block"><SectionLabel number="05">Education</SectionLabel><div className="placeholder-row"><div><h3>[Degree / Course]</h3><p>[Institution]</p></div><span>[Graduation year]</span></div></div><div className="credential-block"><SectionLabel number="06">Certifications</SectionLabel><div className="placeholder-row"><div><h3>[Certification name]</h3><p>[Issuing organization]</p></div><span>View certificate ↗</span></div></div></section>

      <section id="contact" className="contact-section"><div className="container contact-grid"><div><SectionLabel number="07">Start a conversation</SectionLabel><h2>Have an idea?<br /><span>Let's build something meaningful.</span></h2><p>I'm always open to conversations about product ideas, engineering challenges, and new opportunities.</p><div className="contact-links"><a href={`mailto:${profile.email}`}><Mail size={17} /> {profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /> LinkedIn <ArrowUpRight size={14} /></a></div></div><form className="contact-form" onSubmit={e => { e.preventDefault(); setFormSent(true) }}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Subject<input required placeholder="What's on your mind?" /></label><label>Message<textarea required rows={4} placeholder="Tell me a little about it..." /></label><button className="button primary" type="submit">{formSent ? <>Message noted <Check size={16} /></> : <>Send message <Send size={15} /></>}</button>{formSent && <small className="form-note">Thanks — this demo form is ready to connect to Resend or your preferred email service.</small>}</form></div></section>
      <section id="certifications" className="section certifications-section container"><SectionLabel number="06">Certifications</SectionLabel>{certifications.length ? <div className="certification-list">{certifications.map(cert => <div className="placeholder-row" key={`${cert.issuer}-${cert.name}`}><div><h3>{cert.name}</h3><p>{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</p></div>{cert.url ? <a className="certificate-link" href={cert.url} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={14} /></a> : <span>Certificate link pending</span>}</div>)}</div> : <div className="placeholder-row"><div><h3>Add your certifications</h3><p>Certification name · Issuing organization · Date</p></div><span>Details pending</span></div>}</section>
      <section id="education" className="section education-section container"><SectionLabel number="05">Education</SectionLabel><div className="placeholder-row"><div><h3>{education.degree}</h3><p>{education.institution} · {education.result}</p></div><span>{education.completion}</span></div></section>
      <div className="phone-contact container"><a href={`tel:${profile.phone}`}>Phone: {profile.phone}</a></div>
    </main>
    <footer className="footer container"><span>© {new Date().getFullYear()} Vaishnav R</span><span>Designed &amp; built with curiosity <Sparkles size={14} /></span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={16} /></button></footer>
  </div>
}

export default App
