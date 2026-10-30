import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import Magnetic from './Magnetic'
import styles from './Header.module.css'

export default function Header() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  // Fecha o menu ao navegar
  useEffect(() => setOpen(false), [pathname])

  // Esconde o header ao rolar para baixo, mostra ao rolar para cima
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 160)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useGSAP(
    () => {
      if (!open || prefersReducedMotion()) return
      gsap.from('[data-menu-item]', { yPercent: 120, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.1 })
    },
    { scope: menu, dependencies: [open] },
  )

  const links = [
    { to: '/#work', label: t.nav.work },
    { to: '/about', label: t.nav.about },
    { to: '#contact', label: t.nav.contact },
  ]

  const LangToggle = (
    <div className={styles.lang} role="group" aria-label="Language">
      {(['pt', 'en'] as const).map((l) => (
        <button key={l} className={lang === l ? styles.langActive : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <header className={`${styles.header} ${hidden && !open ? styles.hidden : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Magnetic strength={0.25}>
            <Link to="/" className={styles.logo} aria-label="Chrys — home">
              <img src="/favicon.png" alt="" width={36} height={36} />
              <span>Chrys</span>
            </Link>
          </Magnetic>

          <nav className={styles.nav} aria-label="Principal">
            {links.map((l) =>
              l.to.startsWith('#') ? (
                <a key={l.to} href={l.to} className={styles.link}>
                  {l.label}
                </a>
              ) : (
                <NavLink key={l.to} to={l.to} className={styles.link}>
                  {l.label}
                </NavLink>
              ),
            )}
            {LangToggle}
          </nav>

          <button className={styles.burger} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu">
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" ref={menu} className={styles.menu}>
          <nav className={styles.menuNav}>
            {links.map((l, i) => (
              <span key={l.to} className={styles.menuMask}>
                {l.to.startsWith('#') ? (
                  <a data-menu-item href={l.to} onClick={() => setOpen(false)} className="display">
                    <small>0{i + 1}</small>
                    {l.label}
                  </a>
                ) : (
                  <Link data-menu-item to={l.to} className="display">
                    <small>0{i + 1}</small>
                    {l.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
          {LangToggle}
        </div>
      )}
    </>
  )
}
