import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { projects } from '../content/projects'
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/motion'
import styles from './WorkList.module.css'

/**
 * Lista de trabalhos em linhas grandes. No desktop, uma prévia da capa
 * flutua e segue o mouse; no mobile, cada linha vira um card com a imagem.
 */
export default function WorkList() {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const { contextSafe } = useGSAP(
    () => {
      if (!prefersReducedMotion()) {
        gsap.from('[data-row]', {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        })
      }

      if (!hasFinePointer() || !preview.current) return
      const x = gsap.quickTo(preview.current, 'x', { duration: 0.7, ease: 'power3' })
      const y = gsap.quickTo(preview.current, 'y', { duration: 0.7, ease: 'power3' })
      const rot = gsap.quickTo(preview.current, 'rotation', { duration: 0.9, ease: 'power3' })
      let lastX = 0
      const onMove = (e: PointerEvent) => {
        x(e.clientX)
        y(e.clientY)
        rot(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4))
        lastX = e.clientX
      }
      window.addEventListener('pointermove', onMove)
      return () => window.removeEventListener('pointermove', onMove)
    },
    { scope: root },
  )

  const show = contextSafe((i: number | null) => {
    setActive(i)
    if (!preview.current || !hasFinePointer()) return
    gsap.to(preview.current, {
      scale: i === null ? 0 : 1,
      opacity: i === null ? 0 : 1,
      duration: 0.5,
      ease: i === null ? 'power3.in' : 'back.out(1.6)',
    })
  })

  return (
    <div ref={root} className={styles.list} onPointerLeave={() => show(null)}>
      {projects.map((p, i) => {
        const c = t.cases[p.slug]
        return (
          <Link
            key={p.slug}
            to={`/work/${p.slug}`}
            data-row
            data-cursor="view"
            data-cursor-label={t.work.view}
            className={`${styles.row} ${active !== null && active !== i ? styles.dim : ''}`}
            onPointerEnter={() => show(i)}
          >
            <span className={styles.index}>0{i + 1}</span>
            <span className={`display ${styles.name}`}>{c.name}</span>
            <span className={styles.meta}>
              <span>{c.tags}</span>
              <span>{c.year}</span>
            </span>
            <span className={styles.arrow} aria-hidden>
              ↗
            </span>
            {/* Imagem do card no mobile */}
            <span className={styles.mobileCover} style={{ background: p.color }}>
              {p.cover ? <img src={p.cover} alt="" loading="lazy" /> : <span className="display">{c.name}</span>}
            </span>
            <span className={styles.tagline}>{c.tagline}</span>
          </Link>
        )
      })}

      <div ref={preview} className={styles.preview} aria-hidden>
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className={styles.previewItem}
            style={{ background: p.color, opacity: active === i ? 1 : 0 }}
          >
            {p.cover ? (
              <img src={p.cover} alt="" />
            ) : (
              <span className={`display ${styles.previewPlaceholder}`}>{t.cases[p.slug].name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
