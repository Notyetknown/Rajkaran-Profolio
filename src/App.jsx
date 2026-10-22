import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Sun,
  Moon,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Code2,
  Server,
  Layers,
  Cloud,
  Copy,
  ExternalLink,
  BookOpen,
  Award,
  BriefcaseBusiness,
} from 'lucide-react'
import {
  portfolio as P,
  nav,
  skills,
  experience,
  projects,
  capabilities,
  hackathon,
  certificateFolder,
} from './data/content'
import html5Logo from 'simple-icons/icons/html5.svg'
import css3Logo from 'simple-icons/icons/css.svg'
import javascriptLogo from 'simple-icons/icons/javascript.svg'
import reactLogo from 'simple-icons/icons/react.svg'
import nextLogo from 'simple-icons/icons/nextdotjs.svg'
import tailwindLogo from 'simple-icons/icons/tailwindcss.svg'
import nodeLogo from 'simple-icons/icons/nodedotjs.svg'
import expressLogo from 'simple-icons/icons/express.svg'
import mongoLogo from 'simple-icons/icons/mongodb.svg'
import mysqlLogo from 'simple-icons/icons/mysql.svg'
import pythonLogo from 'simple-icons/icons/python.svg'
import javaLogo from 'simple-icons/icons/openjdk.svg'
import cppLogo from 'simple-icons/icons/cplusplus.svg'
import dockerLogo from 'simple-icons/icons/docker.svg'
import linuxLogo from 'simple-icons/icons/linux.svg'
import gitLogo from 'simple-icons/icons/git.svg'
import githubLogo from 'simple-icons/icons/github.svg'
import postmanLogo from 'simple-icons/icons/postman.svg'
import leetcodeLogo from 'simple-icons/icons/leetcode.svg'
import renderLogo from 'simple-icons/icons/render.svg'
import netlifyLogo from 'simple-icons/icons/netlify.svg'
import awsLogo from '/images/amazonwebservices-original-wordmark.svg'
import csharpLogo from '/images/csharp-original.svg'
const icons = {
  ui: Code2,
  api: Server,
  full: Layers,
  cloud: Cloud,
}
const WEB3FORMS_ACCESS_KEY = '87b68333-7098-477a-a1d5-c0784a6f009c'
const initialContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}
const contactFields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'subject', label: 'Subject', type: 'text', required: false },
]
const technologyLogos = {
  HTML5: html5Logo,
  CSS3: css3Logo,
  JavaScript: javascriptLogo,
  React: reactLogo,
  'Next.js': nextLogo,
  'Tailwind CSS': tailwindLogo,
  'Node.js': nodeLogo,
  Express: expressLogo,
  MongoDB: mongoLogo,
  MySQL: mysqlLogo,
  Python: pythonLogo,
  Java: javaLogo,
  'C++': cppLogo,
  Docker: dockerLogo,
  Linux: linuxLogo,
  Git: gitLogo,
  GitHub: githubLogo,
  Postman: postmanLogo,
  Render: renderLogo,
  Netlify: netlifyLogo,
  AWS: awsLogo,
  'C#': csharpLogo,
}
const id = (s) => s.toLowerCase()
const externalProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}
const revealTransition = {
  duration: 0.46,
  ease: [0.22, 0.61, 0.36, 1],
}
const contactLinks = [
  { label: 'Email', href: `mailto:${P.email}`, icon: Mail },
  { label: 'LinkedIn', href: P.linkedin, icon: Linkedin },
  { label: 'GitHub', href: P.github, icon: Github },
]
function ScrollProgress() {
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0
        document.documentElement.style.setProperty(
          '--scroll-progress',
          String(Math.min(1, Math.max(0, progress)))
        )
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      document.documentElement.style.removeProperty('--scroll-progress')
    }
  }, [])
  return <div className="scroll-progress" aria-hidden="true" />
}
function useTheme() {
  const [t, setT] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = t
    try {
      localStorage.setItem('theme', t)
    } catch (e) {}
  }, [t])
  return [t, () => setT((x) => (x === 'dark' ? 'light' : 'dark'))]
}
function Img({ src, alt, label, className = '', loading = 'lazy', fetchPriority }) {
  const [bad, setBad] = useState(false)
  return bad ? (
    <div role="img" aria-label={alt} className={`${className} image-placeholder`}>
      {label}
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={`${className} image-cover`}
      loading={loading}
      fetchpriority={fetchPriority}
      onError={() => setBad(true)}
    />
  )
}
function ScrollReveal({ children, className = '', delay = 0, as = 'div', ...props }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.12,
  })
  const Element = motion[as] || motion.div
  return (
    <Element
      ref={ref}
      className={className}
      initial={false}
      animate={
        !reduced && inView
          ? {
              opacity: [0.78, 1],
              y: [12, 0],
            }
          : {
              opacity: 1,
              y: 0,
            }
      }
      transition={{
        ...revealTransition,
        delay,
      }}
      {...props}
    >
      {children}
    </Element>
  )
}
function Technology({ name, index = 0 }) {
  const logo = technologyLogos[name]
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.25,
  })
  return (
    <motion.span
      ref={ref}
      className="tech-chip"
      tabIndex={0}
      role="img"
      aria-label={name === 'AWS' ? 'Amazon Web Services (AWS)' : name}
      title={name === 'AWS' ? 'Amazon Web Services' : name}
      initial={false}
      animate={
        !reduced && inView
          ? {
              opacity: [0.72, 1],
              y: [8, 0],
              scale: [0.97, 1],
            }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
            }
      }
      whileHover={
        reduced
          ? undefined
          : {
              y: -2,
              scale: 1.035,
            }
      }
      whileFocus={
        reduced
          ? undefined
          : {
              y: -2,
              scale: 1.035,
            }
      }
      transition={{
        ...revealTransition,
        delay: Math.min(index * 0.035, 0.18),
      }}
    >
      {logo && (
        <img
          className={name === 'AWS' || name === 'C#' ? 'color-brand-icon' : ''}
          src={logo}
          alt=""
          aria-hidden="true"
        />
      )}
      <span>{name}</span>
    </motion.span>
  )
}
function Navbar({ onHire }) {
  const [theme, toggle] = useTheme(),
    [open, setOpen] = useState(false),
    [scrolled, setS] = useState(false),
    [active, setA] = useState(''),
    btn = useRef()
  const reduced = useReducedMotion()
  useEffect(() => {
    const f = () => setS(scrollY > 20)
    f()
    window.addEventListener('scroll', f, {
      passive: true,
    })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    const o = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setA(x.target.id)),
      {
        rootMargin: '-45% 0px -50% 0px',
      }
    )
    nav.forEach((n) => {
      const el = document.getElementById(id(n))
      el && o.observe(el)
    })
    return () => o.disconnect()
  }, [])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const k = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    window.addEventListener('keydown', k)
    return () => {
      window.removeEventListener('keydown', k)
      document.body.style.overflow = previousOverflow
    }
  }, [open])
  return (
    <motion.header
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              y: -12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={revealTransition}
      className="site-header"
    >
      <div className="wrap">
        <nav aria-label="Main" className={`glass site-nav${scrolled ? ' is-scrolled' : ''}`}>
          <a
            className="site-brand"
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              scrollTo({
                top: 0,
                behavior: reduced ? 'auto' : 'smooth',
              })
            }}
          >
            {P.brand}
            <span className="brand-dot">.</span>
          </a>
          <ul className="site-nav-links hidden xl:flex">
            {nav.map((n) => (
              <li key={n}>
                <motion.a
                  href={'#' + id(n)}
                  whileHover={
                    reduced
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  aria-current={active === id(n) ? 'true' : undefined}
                >
                  {n}
                </motion.a>
              </li>
            ))}
          </ul>
          <div className="site-nav-actions">
            <motion.button
              whileTap={{
                rotate: 90,
                scale: 0.9,
              }}
              className="btn nav-icon-button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
              type="button"
              className="btn pri nav-cta"
              onClick={onHire}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -2,
                    }
              }
              whileTap={
                reduced
                  ? undefined
                  : {
                      scale: 0.98,
                    }
              }
            >
              <span className="nav-cta-full">Hire Me</span>
              <span className="nav-cta-compact">Hire</span>
            </motion.button>
            <button
              ref={btn}
              className="btn xl:hidden nav-icon-button"
              style={{
                padding: 10,
              }}
              aria-expanded={open}
              aria-controls="mm"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.ul
              id="mm"
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      y: -8,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduced
                  ? undefined
                  : {
                      opacity: 0,
                      y: -8,
                    }
              }
              transition={{
                duration: 0.18,
                ease: 'easeOut',
              }}
              className="glass site-mobile-menu xl:hidden"
            >
              {nav.map((n, i) => (
                <motion.li
                  key={n}
                  initial={
                    reduced
                      ? false
                      : {
                          opacity: 0,
                          x: -6,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.18,
                    delay: reduced ? 0 : i * 0.025,
                  }}
                >
                  <a href={'#' + id(n)} onClick={() => setOpen(false)}>
                    {n}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
function Hero({ onHire }) {
  const rm = useReducedMotion()
  const heroContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }
  const heroItem = {
    hidden: {
      opacity: 1,
      y: 0,
    },
    visible: {
      opacity: [0.72, 1],
      y: [12, 0],
      transition: revealTransition,
    },
  }
  return (
    <section id="top" className="hero-section hero-section-top">
      <div className="wrap">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <motion.div
            initial={rm ? false : 'hidden'}
            animate={rm ? undefined : 'visible'}
            variants={rm ? undefined : heroContainer}
          >
            <motion.p variants={rm ? undefined : heroItem} className="hero-eyebrow">
              <span className="availability-dot" /> Rajkaran Sharma
            </motion.p>
            <motion.h1 variants={rm ? undefined : heroItem} className="hero-title">
              <span>{P.headline.split(' | ')[0]}</span>
              <span className="hero-title-accent">{P.headline.split(' | ')[1]}</span>
            </motion.h1>
            <motion.p variants={rm ? undefined : heroItem} className="muted hero-intro">
              {P.intro}
            </motion.p>
            <motion.div variants={rm ? undefined : heroItem} className="hero-actions">
              <motion.a
                className="btn pri"
                href="#projects"
                whileHover={
                  rm
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  rm
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
              >
                View Projects
                <ArrowUpRight size={17} />
              </motion.a>
              <motion.a
                className="btn hire-hero-button"
                href="#hire-modal"
                onClick={(event) => {
                  event.preventDefault()
                  onHire()
                }}
                whileHover={
                  rm
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  rm
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
              >
                Hire Me
                <BriefcaseBusiness size={16} />
              </motion.a>
            </motion.div>
            <motion.div
              variants={rm ? undefined : heroItem}
              className="profile-links"
              aria-label="Developer profiles"
            >
              <a
                href={P.github}
                className="profile-link"
                aria-label="GitHub profile"
                title="GitHub"
                {...externalProps}
              >
                <Github size={19} />
                <span>GitHub</span>
              </a>
              <a
                href={P.leetcode}
                className="profile-link"
                aria-label="LeetCode profile"
                title="LeetCode"
                {...externalProps}
              >
                <img className="leetcode-logo" src={leetcodeLogo} alt="" aria-hidden="true" />
                <span>LeetCode</span>
              </a>
              <a
                href={P.linkedin}
                className="profile-link"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                {...externalProps}
              >
                <Linkedin size={19} />
                <span>LinkedIn</span>
              </a>
              <a
                href={'mailto:' + P.email}
                className="profile-link"
                aria-label="Email Rajkaran"
                title="Email"
              >
                <Mail size={19} />
                <span>Email</span>
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={
              rm
                ? false
                : {
                    opacity: 0.75,
                    y: 12,
                    scale: 0.99,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              ...revealTransition,
              delay: 0.2,
            }}
            className="hero-photo-wrap"
          >
            <Img
              src={P.photo}
              alt="Professional portrait of Rajkaran Sharma"
              label="RS"
              className="hero-photo"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to the About section">
          <span className="scroll-cue-line" aria-hidden="true" />
          <span>Scroll to explore</span>
        </a>
      </div>
    </section>
  )
}
function HireModal({ open, onClose }) {
  const reduced = useReducedMotion()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const previousActiveElement = document.activeElement
    const previousOverflow = document.body.style.overflow
    const inertElements = [...document.querySelectorAll('main, .site-header, .site-footer')]
    const previousInert = inertElements.map((element) => element.inert)
    document.body.style.overflow = 'hidden'
    inertElements.forEach((element) => {
      element.inert = true
    })
    const frame = requestAnimationFrame(() => closeRef.current?.focus())
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [
        ...dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ),
      ].filter((element) => element.getClientRects().length > 0)
      if (focusable.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      inertElements.forEach((element, index) => {
        element.inert = previousInert[index]
      })
      if (previousActiveElement instanceof HTMLElement && previousActiveElement.isConnected) {
        previousActiveElement.focus()
      }
    }
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="hire-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hire-modal-title"
            aria-describedby="hire-modal-description"
            tabIndex={-1}
            className="hire-modal"
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.24, ease: [0.2, 0.75, 0.25, 1] }}
          >
            <div className="hire-modal-top">
              <span className="hire-modal-kicker">
                <span className="availability-dot" />
                OPEN TO OPPORTUNITIES
              </span>
              <button
                ref={closeRef}
                className="btn nav-icon-button hire-modal-close"
                type="button"
                onClick={onClose}
                aria-label="Close Hire Me dialog"
              >
                <X size={18} />
              </button>
            </div>
            <h2 id="hire-modal-title">Let’s build something useful.</h2>
            <p id="hire-modal-description" className="muted hire-modal-copy">
              I’m Rajkaran, an early-career software engineer focused on full-stack development. I’m
              open to fresher opportunities, internships, and junior engineering roles where I can
              contribute, learn, and grow with a team.
            </p>
            <div className="hire-modal-links" aria-label="Contact and professional profiles">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  className="hire-contact-link"
                  href={href}
                  {...(label === 'Email' ? {} : externalProps)}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                  {label !== 'Email' && <ExternalLink size={14} aria-hidden="true" />}
                </a>
              ))}
            </div>
            <a className="btn pri hire-modal-cta" href={`mailto:${P.email}`}>
              Contact me about an opportunity
              <ArrowUpRight size={17} />
            </a>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <ScrollReveal className="section-heading-row">
          <div>
            <p className="section-kicker">TOOLS I WORK WITH</p>
            <h2>My technical toolkit</h2>
          </div>
          <p className="muted section-intro">
            A practical set of languages, frameworks, and tools I use in projects and continue to
            build on.
          </p>
        </ScrollReveal>
        <div className="skill-grid">
          {Object.entries(skills).map(([k, v], i) => (
            <ScrollReveal
              key={k}
              as="article"
              delay={i * 0.06}
              className={`skill-group skill-group-${i + 1}`}
            >
              <h3>{k}</h3>
              <div className="tech-wall">
                {v.map((s, index) => (
                  <Technology key={s} name={s} index={index} />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
function About() {
  return (
    <section id="about">
      <div className="wrap grid md:grid-cols-2 gap-12 items-start">
        <ScrollReveal>
          <p className="section-kicker">A LITTLE ABOUT ME</p>
          <h2>Learning by building, improving with every release.</h2>
        </ScrollReveal>
        <div className="about-copy">
          {P.about.map((t, i) => (
            <ScrollReveal key={t} as="p" delay={i * 0.07} className={i ? 'muted' : ''}>
              {t}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
function Experience() {
  return (
    <section id="experience" className="dark-band">
      <div className="wrap">
        <ScrollReveal className="section-heading-row">
          <div>
            <p className="section-kicker">WORK &amp; GROWTH</p>
            <h2>Experience</h2>
          </div>
          <p className="muted section-intro">
            Professional work, self-directed learning, and collaboration have each shaped how I
            approach software.
          </p>
        </ScrollReveal>
        <div className="experience-layout">
          <ScrollReveal as="article" className="experience-card">
            <div className="experience-card-top">
              <span className="experience-icon">
                <BriefcaseBusiness size={20} />
              </span>
              <span className="experience-date">{experience.dates}</span>
            </div>
            <h3>{experience.role}</h3>
            <p className="experience-org">{experience.org}</p>
            <ul className="experience-points">
              {experience.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="tech-wall experience-tech">
              {experience.tags.map((t, index) => (
                <Technology key={t} name={t} index={index} />
              ))}
            </div>
            <a className="btn btn-light" href={experience.certificate} {...externalProps}>
              View Internship Certificate
              <ExternalLink size={16} />
            </a>
          </ScrollReveal>
          <ScrollReveal as="article" className="learning-card" delay={0.08}>
            <span className="experience-icon">
              <BookOpen size={20} />
            </span>
            <p className="section-kicker">CONTINUOUS DEVELOPMENT</p>
            <h3>Learning Phase &amp; Technical Development</h3>
            <p className="muted">
              A self-directed learning path alongside my studies and project work—not a separate job
              title.
            </p>
            <ol className="learning-steps">
              <ScrollReveal as="li" delay={0.04}>
                <strong>Build the foundations</strong>
                <span>Practice programming, debugging, and problem-solving.</span>
              </ScrollReveal>
              <ScrollReveal as="li" delay={0.08}>
                <strong>Connect the full stack</strong>
                <span>Build interfaces, connect REST APIs, and work with databases.</span>
              </ScrollReveal>
              <ScrollReveal as="li" delay={0.12}>
                <strong>Learn how software ships</strong>
                <span>
                  Use Git and GitHub, and explore Docker, Docker Compose, cloud infrastructure, and
                  deployment.
                </span>
              </ScrollReveal>
            </ol>
          </ScrollReveal>
        </div>
        <ScrollReveal as="article" className="hackathon-card" delay={0.12}>
          <div className="hackathon-badge">
            <Award size={23} />
            <span>TEAM RESULT</span>
          </div>
          <div className="hackathon-copy">
            <p className="section-kicker">HACKATHON · {hackathon.track}</p>
            <h3>{hackathon.name}</h3>
            <p className="muted">
              {hackathon.organizer} · {hackathon.description}
            </p>
          </div>
          <p className="hackathon-result">{hackathon.result}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
function Projects() {
  const rm = useReducedMotion()
  return (
    <section id="projects" className="projects-section">
      <div className="wrap">
        <ScrollReveal className="section-heading-row">
          <div>
            <p className="section-kicker">SELECTED WORK</p>
            <h2>Projects, made tangible.</h2>
          </div>
          <p className="muted section-intro">
            A few applications I have worked on, each with a live preview and its own purpose.
          </p>
        </ScrollReveal>
        <div className="project-list">
          {projects.map((p, i) => (
            <ScrollReveal
              key={p.name}
              as="article"
              delay={i * 0.06}
              className={`card project-card ${i % 2 ? 'project-card-reverse' : ''}`}
              whileHover={
                rm
                  ? undefined
                  : {
                      y: -4,
                    }
              }
            >
              <motion.a
                className="project-visual"
                href={p.live}
                {...externalProps}
                aria-label={`View ${p.name} live demo`}
                whileHover={
                  rm
                    ? undefined
                    : {
                        scale: 1.01,
                      }
                }
              >
                <Img
                  src={p.image}
                  alt={`${p.name} application screenshot`}
                  label={p.name[0]}
                  className="project-img"
                />
                <span className="project-image-link">
                  Visit project
                  <ArrowUpRight size={17} />
                </span>
              </motion.a>
              <div className="project-copy">
                <div className="project-heading">
                  <p className="project-kind">{p.kind}</p>
                  <span className="project-number">0{i + 1}</span>
                </div>
                <h3>{p.name}</h3>
                <p className="muted project-description">{p.text}</p>
                <div className="tech-wall project-tech">
                  {p.tags.map((t, index) => (
                    <Technology key={t} name={t} index={index} />
                  ))}
                </div>
                <div className="project-actions">
                  {p.repo && (
                    <motion.a
                      className="btn"
                      href={p.repo}
                      {...externalProps}
                      whileHover={
                        rm
                          ? undefined
                          : {
                              y: -2,
                            }
                      }
                    >
                      <Github size={16} />
                      View on GitHub
                      <ExternalLink size={14} />
                    </motion.a>
                  )}
                  <motion.a
                    className="btn pri"
                    href={p.live}
                    {...externalProps}
                    whileHover={
                      rm
                        ? undefined
                        : {
                            y: -2,
                          }
                    }
                    whileTap={
                      rm
                        ? undefined
                        : {
                            scale: 0.98,
                          }
                    }
                  >
                    Live Demo
                    <ArrowUpRight size={16} />
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div
          style={{
            marginTop: 56,
          }}
        >
          <ScrollReveal>
            <h2
              style={{
                fontSize: '1.6rem',
                marginBottom: 20,
              }}
            >
              What I Work On
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((c, i) => {
              const I = icons[c.icon]
              return (
                <ScrollReveal
                  key={c.title}
                  as="article"
                  delay={i * 0.05}
                  className="glass capability-card"
                >
                  <I size={22} color="#FF6B35" />
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      margin: '14px 0 8px',
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="muted"
                    style={{
                      margin: 0,
                      lineHeight: 1.6,
                      fontSize: '.95rem',
                    }}
                  >
                    {c.text}
                  </p>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
function Certificates() {
  const rm = useReducedMotion()
  return (
    <section id="certificates" className="certificates-section">
      <ScrollReveal className="wrap certificates-content">
        <div>
          <p className="section-kicker">LEARNING, RECOGNIZED</p>
          <h2>Certificates</h2>
          <p className="muted">
            Browse my certificates and learning credentials in the shared collection.
          </p>
        </div>
        <motion.a
          className="btn pri"
          href={certificateFolder}
          {...externalProps}
          whileHover={
            rm
              ? undefined
              : {
                  y: -2,
                }
          }
        >
          View All Certificates
          <ExternalLink size={17} />
        </motion.a>
      </ScrollReveal>
    </section>
  )
}
function LeetCode() {
  const rm = useReducedMotion()
  return (
    <section id="leetcode" className="leetcode-section">
      <ScrollReveal className="wrap leetcode-card">
        <div className="leetcode-brand">
          <a
            className="leetcode-logo-link"
            href={P.leetcode}
            {...externalProps}
            aria-label="Visit Rajkaran's LeetCode profile"
          >
            <img className="leetcode-logo" src={leetcodeLogo} alt="" aria-hidden="true" />
          </a>
          <div>
            <p className="section-kicker">CODING PROFILE</p>
            <h2>LeetCode</h2>
            <span className="muted">@rajkaran636</span>
          </div>
        </div>
        <p className="muted leetcode-copy">
          I use algorithm and data-structure problems to practice breaking down unfamiliar
          challenges and improving my problem-solving approach.
        </p>
        <motion.a
          className="btn"
          href={P.leetcode}
          {...externalProps}
          whileHover={
            rm
              ? undefined
              : {
                  y: -2,
                }
          }
        >
          View LeetCode Profile
          <ArrowUpRight size={17} />
        </motion.a>
      </ScrollReveal>
    </section>
  )
}
function Contact() {
  const reduced = useReducedMotion()
  const [formValues, setFormValues] = useState(initialContactForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleChange = (field) => (event) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: event.target.value,
    }))
  }

  const validateForm = () => {
    const validationErrors = {}
    if (!formValues.name.trim()) validationErrors.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(formValues.email))
      validationErrors.email = 'Enter a valid email address.'
    if (formValues.message.trim().length < 10)
      validationErrors.message = 'Write at least a short sentence.'
    return validationErrors
  }

  const submit = async (e) => {
    e.preventDefault()
    const formElement = e.currentTarget
    const validationErrors = validateForm()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length) return

    setIsSending(true)
    setStatus('Sending your message…')
    try {
      const formData = new FormData(formElement)
      formData.append('access_key', WEB3FORMS_ACCESS_KEY)
      formData.set(
        'subject',
        formValues.subject.trim() || `Portfolio message from ${formValues.name.trim()}`
      )
      formData.set('from_name', formValues.name.trim())
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (!response.ok || !data.success) {
        setStatus(
          data.message || 'Your message could not be sent. Please try again or email me directly.'
        )
        return
      }
      setFormValues(initialContactForm)
      setErrors({})
      setStatus('Thanks for reaching out. Your message has been sent successfully.')
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus('Unable to send your message right now. Please try again or email me directly.')
    } finally {
      setIsSending(false)
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(P.email)
      setStatus('Email address copied.')
    } catch {
      setStatus('Copy failed. My email is ' + P.email)
    }
  }
  return (
    <section id="contact" className="dark-band">
      <ScrollReveal className="wrap grid md:grid-cols-2 gap-12">
        <div>
          <h2>Let's Talk</h2>
          <p className="muted contact-intro">
            I'm open to internships, junior roles and project work. Send a note about what you're
            building and I'll reply by email.
          </p>
          <div className="contact-actions">
            <button className="btn contact-action" type="button" onClick={copy}>
              <Copy size={16} />
              Copy Email
            </button>
            <a className="btn contact-action" href={P.github} {...externalProps}>
              <Github size={16} />
              GitHub
            </a>
            <a className="btn contact-action" href={P.linkedin} {...externalProps}>
              <Linkedin size={16} />
              LinkedIn
            </a>
            <motion.a
              className="btn contact-action"
              href={P.leetcode}
              {...externalProps}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -2,
                    }
              }
            >
              <img
                className="contact-brand-icon leetcode-logo"
                src={leetcodeLogo}
                alt=""
                aria-hidden="true"
              />
              LeetCode
            </motion.a>
          </div>
        </div>
        <form onSubmit={submit} noValidate className="contact-form" aria-busy={isSending}>
          {contactFields.map(({ name, label, type, required }) => (
            <div key={name}>
              <label htmlFor={name}>
                {label}
                {required && ' *'}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={formValues[name]}
                onChange={handleChange(name)}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
              {errors[name] && (
                <p id={`${name}-error`} className="err" role="alert">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
          <div>
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formValues.message}
              onChange={handleChange('message')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="err" role="alert">
                {errors.message}
              </p>
            )}
          </div>
          <motion.button
            className="btn pri contact-submit"
            type="submit"
            disabled={isSending}
            whileHover={
              reduced || isSending
                ? undefined
                : {
                    y: -2,
                  }
            }
            whileTap={
              reduced || isSending
                ? undefined
                : {
                    scale: 0.98,
                  }
            }
          >
            {isSending ? 'Sending…' : 'Send Message'}
            {!isSending && <ArrowUpRight size={16} />}
          </motion.button>
          <p role="status" aria-live="polite" className="muted contact-status">
            {status}
          </p>
        </form>
      </ScrollReveal>
    </section>
  )
}
function Footer() {
  return (
    <ScrollReveal as="footer" className="site-footer">
      <div className="wrap footer-inner">
        <p className="muted footer-copyright">
          © {new Date().getFullYear()} {P.name}
        </p>
        <div className="footer-links">
          {nav.map((n) => (
            <a key={n} href={'#' + id(n)} className="muted">
              {n}
            </a>
          ))}
          <a href={P.github} className="muted" {...externalProps}>
            GitHub
          </a>
          <a href={P.linkedin} className="muted" {...externalProps}>
            LinkedIn
          </a>
        </div>
        <a className="back-to-top" href="#top">
          Back to top <ArrowUpRight size={15} />
        </a>
      </div>
    </ScrollReveal>
  )
}
export default function App() {
  const [hireOpen, setHireOpen] = useState(false)
  const closeHire = () => setHireOpen(false)
  return (
    <>
      <ScrollProgress />
      <Navbar onHire={() => setHireOpen(true)} />
      <main>
        <Hero onHire={() => setHireOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <LeetCode />
        <Contact />
      </main>
      <Footer />
      <HireModal open={hireOpen} onClose={closeHire} />
    </>
  )
}
