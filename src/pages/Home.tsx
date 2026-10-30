import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { gsap, ScrollTrigger, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/motion'
import BlackCat from '../components/BlackCat'
import SplitReveal from '../components/SplitReveal'
import WorkList from '../components/WorkList'
import ProcessStrip from '../components/ProcessStrip'
import { projects } from '../content/projects'
import styles from './Home.module.css'

export default function Home() {
  const { t, lang } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const { hash } = useLocation()

  // Link "/#work" vindo de outra página
  useEffect(() => {
    if (!hash) return
    const id = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 500)
    return () => window.clearTimeout(id)
  }, [hash])

  useGSAP(
    () => {
      const reduced = prefersReducedMotion()

      // Hero: título entra linha por linha
      if (!reduced) {
        gsap.from('[data-hero-line] > span', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.12, delay: 0.5 })
        gsap.from('[data-hero-fade]', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.9 })
      }

      // Hero: leve paralaxe do título contra o mouse
      if (hasFinePointer() && !reduced) {
        const title = root.current?.querySelector('[data-hero-title]')
        const x = gsap.quickTo(title!, 'x', { duration: 1.2, ease: 'power3' })
        const y = gsap.quickTo(title!, 'y', { duration: 1.2, ease: 'power3' })
        const onMove = (e: PointerEvent) => {
          x((e.clientX / window.innerWidth - 0.5) * -24)
          y((e.clientY / window.innerHeight - 0.5) * -16)
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      }
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  )

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Manifesto: palavras acendem conforme a rolagem
      gsap.fromTo(
        '[data-manifesto] [data-w]',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-manifesto]', start: 'top 75%', end: 'bottom 45%', scrub: true },
        },
      )

      // Faixa de texto infinita que acelera com a velocidade da rolagem
      const track = root.current?.querySelector('[data-marquee]')
      if (!track) return
      const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 })
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300)
          gsap.to(loop, { timeScale: v >= 0 ? 1 + v : -1 + v, duration: 0.3, overwrite: true })
          gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.3 })
        },
      })
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  )

  const manifestoWords = t.manifesto.text.split(' ')
  const highlightWords = t.manifesto.highlight.split(' ')
  const marquee = t.process.steps.map((s) => s.title)

  return (
    <div ref={root}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow" data-hero-fade>
            {t.hero.eyebrow}
          </p>
          <h1 className={`display ${styles.heroTitle}`} data-hero-title>
            {t.hero.lines.map((line, i) => (
              <span key={line} className="split-line" data-hero-line>
                <span className={i === 1 ? 'accent' : ''}>{line}</span>
              </span>
            ))}
          </h1>
          <p className={styles.heroIntro} data-hero-fade>
            {t.hero.intro}
          </p>
        </div>

        <div className={styles.heroCat}>
          <BlackCat />
        </div>

        <a href="#work" className={styles.scroll} data-hero-fade>
          <span className={styles.scrollLine} aria-hidden />
          {t.hero.scroll}
        </a>
      </section>

      <div className={styles.marquee} aria-hidden>
        <div data-marquee className={styles.marqueeTrack}>
          {[0, 1].map((n) => (
            <span key={n} className={`display ${styles.marqueeGroup}`}>
              {[...marquee, ...marquee].map((word, i) => (
                <span key={i}>
                  {word} <em>✦</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className={`container ${styles.manifesto}`}>
        <p className="eyebrow">{t.manifesto.eyebrow}</p>
        <p className={styles.manifestoText} data-manifesto>
          {manifestoWords.map((w, i) => (
            <span key={`m${i}`} data-w>
              {w}{' '}
            </span>
          ))}
          {highlightWords.map((w, i) => (
            <span key={`h${i}`} data-w className="accent">
              {w}{' '}
            </span>
          ))}
        </p>
      </section>

      <section id="work" className={`container ${styles.work}`}>
        <div className={styles.workHead}>
          <div>
            <p className="eyebrow">{t.work.eyebrow}</p>
            <SplitReveal text={t.work.title} className={`display ${styles.workTitle}`} />
          </div>
          <span className={styles.workCount}>({String(projects.length).padStart(2, '0')})</span>
        </div>
        <WorkList />
      </section>

      <ProcessStrip />
    </div>
  )
}
