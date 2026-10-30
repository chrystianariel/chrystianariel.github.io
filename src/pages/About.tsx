import { useRef } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import SplitReveal from '../components/SplitReveal'
import Reveal from '../components/Reveal'
import styles from './About.module.css'

export default function About() {
  const { t, lang } = useLang()
  const { about } = t
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-photo]',
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(75% at 50% 50%)', duration: 1.6, ease: 'expo.out', delay: 0.7 },
      )
      gsap.fromTo(
        '[data-photo] img',
        { scale: 1.2, yPercent: -6 },
        { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '[data-photo]', start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  )

  return (
    <div ref={root} className={`container ${styles.page}`}>
      <section className={styles.intro}>
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <SplitReveal as="h1" text={about.title} onScroll={false} delay={0.5} className={`display ${styles.title}`} />
          <Reveal className={styles.text} y={24}>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
        <figure className={styles.photo} data-photo>
          <img src="/images/about/chrys.webp" alt="Chrystian Ariel em Istambul" width={1000} height={1000} />
        </figure>
      </section>

      <section className={styles.lists}>
        <div>
          <h2 className="eyebrow">{about.experienceTitle}</h2>
          <Reveal className={styles.list}>
            {about.experience.map((e) => (
              <div key={e.company} className={styles.row}>
                <div>
                  <strong>{e.company}</strong>
                  <span>{e.role}</span>
                </div>
                <span className={styles.period}>{e.period}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div>
          <h2 className="eyebrow">{about.educationTitle}</h2>
          <Reveal className={styles.list}>
            {about.education.map((e) => (
              <div key={e.school} className={styles.row}>
                <div>
                  <strong>{e.school}</strong>
                  <span>{e.course}</span>
                </div>
              </div>
            ))}
          </Reveal>

          <h2 className={`eyebrow ${styles.beyondTitle}`}>{about.beyondTitle}</h2>
          <p className={styles.beyond}>{about.beyond}</p>
        </div>
      </section>
    </div>
  )
}
