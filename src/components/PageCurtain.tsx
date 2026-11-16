import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import Festoon from './ornaments/Festoon'
import styles from './PageCurtain.module.css'

/** Cortina de veludo do picadeiro, desenhada à mão: abre para os lados a cada troca de página. */
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
      <div data-panel="left" className={`${styles.panel} ${styles.left}`}>
        <Drape />
      </div>
      <div data-panel="right" className={`${styles.panel} ${styles.right}`}>
        <Drape />
      </div>
      <div data-valance className={styles.valance}>
        <Festoon className={styles.festoon} />
      </div>
    </div>
  )
}

/** Uma folha da cortina. Esticada na tela; o contorno não deforma (non-scaling-stroke). */
function Drape() {
  return (
    <svg className={styles.drape} viewBox="0 0 200 1000" preserveAspectRatio="none">
      {/* O tecido ocupa a folha toda; a borda ondulada é só o traço, assim as folhas se encontram sem vão */}
      <path className={styles.cloth} d="M0 0 H200 V1000 H0 Z" />
      {/* Brilho do veludo entre as dobras */}
      <g className={styles.sheen}>
        <path d="M50 0 C 44 260, 58 520, 48 1000" />
        <path d="M128 0 C 136 300, 122 600, 134 1000" />
      </g>
      {/* Dobras */}
      <g className={styles.fold}>
        <path d="M24 0 C 18 250, 32 520, 22 1000" />
        <path d="M86 0 C 92 280, 80 560, 90 1000" />
        <path d="M160 0 C 152 260, 166 540, 156 1000" />
      </g>
      {/* Hachura na barra */}
      <g className={styles.hatch}>
        <path d="M10 990 L 22 962 M34 994 L 46 966 M60 990 L 72 962 M98 994 L 110 966 M140 990 L 152 962 M172 994 L 184 966" />
      </g>
      <path className={styles.edge} d="M198 0 C 190 120, 200 240, 193 360 C 187 480, 199 600, 192 720 C 187 840, 198 920, 194 1000" />
    </svg>
  )
}
