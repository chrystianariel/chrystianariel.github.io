import { Fragment, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { getProject, projects, type ProjectImage } from '../content/projects'
import type { CaseSection } from '../content/types'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import SplitReveal from '../components/SplitReveal'
import Reveal from '../components/Reveal'
import styles from './CaseStudy.module.css'

/** Onde cada imagem wide aparece: depois das seções de índice 2, 4, 6... */
const WIDE_AFTER = [2, 4, 6, 8]

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const { t, lang } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const project = getProject(slug)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('[data-hero-fade]', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.7 })

      // Capa: abre com clip-path e a imagem faz paralaxe
      gsap.fromTo(
        '[data-cover]',
        { clipPath: 'inset(12% 8% 12% 8% round 24px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.6, ease: 'expo.out', delay: 0.9 },
      )
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.15 },
          { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })

      // Imagens da galeria entram com clip-path
      gsap.utils.toArray<HTMLElement>('[data-shot]').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(100% 0% 0% 0%)',
          y: 60,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    },
    { scope: root, dependencies: [slug, lang], revertOnUpdate: true },
  )

  if (!project) return <Navigate to="/" replace />

  const c = t.cases[project.slug]
  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const phones = project.gallery.filter((g) => g.kind === 'phone')
  const wides = project.gallery.filter((g) => g.kind === 'wide')

  return (
    <article ref={root} className={styles.page}>
      <header className={`container ${styles.hero}`}>
        <Link to="/#work" className={styles.back} data-hero-fade>
          ← {t.caseUi.back}
        </Link>
        <p className="eyebrow" data-hero-fade>
          0{index + 1} · {c.tags}
        </p>
        <SplitReveal as="h1" text={c.name} onScroll={false} delay={0.5} className={`display ${styles.title}`} />
        <p className={styles.tagline} data-hero-fade>
          {c.tagline}
        </p>
        <dl className={styles.meta} data-hero-fade>
          <div>
            <dt>{t.caseUi.role}</dt>
            <dd>{project.role[lang]}</dd>
          </div>
          <div>
            <dt>{t.caseUi.platform}</dt>
            <dd>{project.platform[lang]}</dd>
          </div>
          <div>
            <dt>{t.caseUi.year}</dt>
            <dd>{c.year}</dd>
          </div>
        </dl>
      </header>

      <div className="container">
        <div className={styles.cover} data-cover style={{ background: project.color }}>
          {project.cover ? (
            <img data-parallax src={project.cover} alt={c.name} />
          ) : (
            <div className={styles.placeholder}>
              <span className="display">{c.name}</span>
              <span className="eyebrow">{t.caseUi.imagePending}</span>
            </div>
          )}
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        {c.sections.map((section, i) => {
          const wideIndex = WIDE_AFTER.indexOf(i)
          const wide = wideIndex >= 0 ? wides[wideIndex] : undefined
          return (
            <Fragment key={section.title}>
              <Section section={section} n={i + 1} />
              {i === 0 && phones.length > 0 && <PhoneRow images={phones} lang={lang} />}
              {wide && <WideShot image={wide} lang={lang} />}
            </Fragment>
          )
        })}

        {c.ai && (
          <section className={styles.ai}>
            <SplitReveal text={t.caseUi.aiTitle} as="h2" className={`display ${styles.aiTitle}`} />
            <Reveal className={styles.aiGrid}>
              <div className={`${styles.aiCard} ${styles.aiUsed}`}>
                <p className="eyebrow">✦ {t.caseUi.aiUsed}</p>
                <ul>
                  {c.ai.used.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.aiCard}>
                <p className="eyebrow">● {t.caseUi.aiHuman}</p>
                <ul>
                  {c.ai.human.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>
        )}
      </div>

      <Link
        to={`/work/${next.slug}`}
        className={styles.next}
        data-cursor="view"
        data-cursor-label={t.work.view}
      >
        <div className="container">
          <p className="eyebrow">{t.caseUi.next}</p>
          <span className={`display ${styles.nextName}`}>
            {t.cases[next.slug].name} <span className={styles.nextArrow}>→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}

function Section({ section, n }: { section: CaseSection; n: number }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>{String(n).padStart(2, '0')}</span>
        <h2 className={styles.sectionTitle}>{section.title}</h2>
      </div>
      <Reveal className={styles.sectionBody} y={30}>
        {section.stats && (
          <div className={styles.stats}>
            {section.stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={`display ${styles.statValue}`}>{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
        {section.items?.map((item) => (
          <div key={item.label} className={styles.item}>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </div>
        ))}
        {section.paragraphs?.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
        {section.bullets && (
          <ul className={styles.bullets}>
            {section.bullets.map((b) => (
              <li key={b.text.slice(0, 32)}>
                {b.label && <strong>{b.label}: </strong>}
                {b.text}
              </li>
            ))}
          </ul>
        )}
        {section.table && (
          <div className={styles.table}>
            {section.table.rows.map(([q, a]) => (
              <div key={q} className={styles.tableRow}>
                <span className={styles.tableQ}>{q}</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  )
}

function PhoneRow({ images, lang }: { images: ProjectImage[]; lang: 'pt' | 'en' }) {
  return (
    <div className={styles.phones}>
      {images.map((img) => (
        <figure key={img.src} data-shot className={styles.phone}>
          <img src={img.src} alt={img.alt[lang]} loading="lazy" />
        </figure>
      ))}
    </div>
  )
}

function WideShot({ image, lang }: { image: ProjectImage; lang: 'pt' | 'en' }) {
  return (
    <figure data-shot className={styles.wide}>
      <img src={image.src} alt={image.alt[lang]} loading="lazy" />
      <figcaption>{image.alt[lang]}</figcaption>
    </figure>
  )
}
