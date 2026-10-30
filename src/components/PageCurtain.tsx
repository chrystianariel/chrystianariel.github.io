import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import styles from './PageCurtain.module.css'

/** Cortina com os olhos do gato que se abre a cada troca de página. */
export default function PageCurtain() {
  const root = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(root.current, { yPercent: -100 })
        return
      }
      gsap
        .timeline()
        .set(root.current, { yPercent: 0 })
        .fromTo('[data-eyes]', { scaleY: 0.1, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.35, ease: 'power2.out' })
        .to('[data-eyes]', { scaleY: 0.1, duration: 0.1, delay: 0.15 })
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.05')
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: false },
  )

  return (
    <div ref={root} className={styles.curtain} aria-hidden>
      <svg data-eyes viewBox="0 0 80 24" className={styles.eyes}>
        <ellipse cx="18" cy="12" rx="12" ry="10" />
        <ellipse cx="62" cy="12" rx="12" ry="10" />
        <ellipse className={styles.pupil} cx="18" cy="12" rx="3" ry="8" />
        <ellipse className={styles.pupil} cx="62" cy="12" rx="3" ry="8" />
      </svg>
    </div>
  )
}
