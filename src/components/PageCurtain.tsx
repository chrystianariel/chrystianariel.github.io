import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import styles from './PageCurtain.module.css'

/** Cortina de veludo do picadeiro: abre para os lados a cada troca de página. */
export default function PageCurtain() {
  const root = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(root.current, { autoAlpha: 0 })
        return
      }
      gsap
        .timeline()
        .set(root.current, { autoAlpha: 1 })
        .set('[data-panel]', { xPercent: 0, skewX: 0 })
        .set('[data-valance]', { yPercent: 0 })
        .to('[data-panel="left"]', { xPercent: -102, skewX: 4, duration: 1.1, ease: 'expo.inOut' }, 0.25)
        .to('[data-panel="right"]', { xPercent: 102, skewX: -4, duration: 1.1, ease: 'expo.inOut' }, 0.25)
        .to('[data-valance]', { yPercent: -110, duration: 0.6, ease: 'power3.in' }, 0.85)
        .set(root.current, { autoAlpha: 0 })
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: false },
  )

  return (
    <div ref={root} className={styles.curtain} aria-hidden>
      <div data-panel="left" className={`${styles.panel} ${styles.left}`} />
      <div data-panel="right" className={`${styles.panel} ${styles.right}`} />
      <div data-valance className={styles.valance}>
        <div className="scallop" />
      </div>
    </div>
  )
}
