import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import styles from './BlackCat.module.css'

type Props = {
  className?: string
  /** Desenha a lua (círculo off-white do favicon) atrás do gato */
  moon?: boolean
}

// Distância máxima (em unidades do viewBox) que a pupila anda dentro do olho
const PUPIL_X = 6
const PUPIL_Y = 4

/**
 * Gato preto em SVG. Os olhos seguem o mouse (ou o toque no mobile),
 * ele pisca de vez em quando, mexe a orelha ao passar em links e balança o rabo.
 */
export default function BlackCat({ className, moon = true }: Props) {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const svg = root.current
      if (!svg) return
      const reduced = prefersReducedMotion()

      // Entrada
      gsap.from(svg.querySelector('[data-cat]'), {
        yPercent: 18,
        opacity: 0,
        duration: reduced ? 0 : 1.4,
        ease: 'expo.out',
        delay: 0.2,
      })

      // Pupilas seguem o ponteiro
      const pupils = gsap.utils.toArray<SVGElement>('[data-pupil]', svg)
      const movers = pupils.map((p) => ({
        x: gsap.quickTo(p, 'x', { duration: 0.6, ease: 'power3.out' }),
        y: gsap.quickTo(p, 'y', { duration: 0.6, ease: 'power3.out' }),
      }))

      const look = (clientX: number, clientY: number) => {
        const r = svg.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height * 0.42
        const dx = gsap.utils.clamp(-1, 1, (clientX - cx) / (window.innerWidth / 2))
        const dy = gsap.utils.clamp(-1, 1, (clientY - cy) / (window.innerHeight / 2))
        movers.forEach((m) => {
          m.x(dx * PUPIL_X)
          m.y(dy * PUPIL_Y)
        })
      }
      const onMove = (e: PointerEvent) => look(e.clientX, e.clientY)
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerdown', onMove)

      if (reduced) {
        return () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerdown', onMove)
        }
      }

      // Piscar em intervalos aleatórios
      const eyes = svg.querySelectorAll('[data-eye]')
      const blink = gsap.timeline({ repeat: -1, repeatDelay: 3.2, delay: 2.4, repeatRefresh: true })
      blink
        .to(eyes, { scaleY: 0.08, transformOrigin: '50% 50%', duration: 0.08, ease: 'power2.in' })
        .to(eyes, { scaleY: 1, duration: 0.14, ease: 'power2.out' })

      // Rabo balançando
      gsap.to(svg.querySelector('[data-tail]'), {
        rotation: 9,
        svgOrigin: '178 286',
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Orelha mexe quando o mouse entra num link ou botão
      const ear = svg.querySelector('[data-ear]')
      let lastTwitch = 0
      const onOver = (e: MouseEvent) => {
        const target = e.target as Element | null
        if (!target?.closest('a, button')) return
        const now = performance.now()
        if (now - lastTwitch < 600) return
        lastTwitch = now
        gsap.fromTo(
          ear,
          { rotation: 0 },
          { rotation: -14, svgOrigin: '150 92', duration: 0.12, yoyo: true, repeat: 3, ease: 'power1.inOut' },
        )
      }
      document.addEventListener('mouseover', onOver)

      return () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerdown', onMove)
        document.removeEventListener('mouseover', onOver)
      }
    },
    { scope: root },
  )

  return (
    <svg
      ref={root}
      className={`${styles.cat} ${className ?? ''}`}
      viewBox="0 0 240 300"
      role="img"
      aria-label="Gato preto"
    >
      {moon && <circle className={styles.moon} cx="120" cy="150" r="118" />}
      <g data-cat>
        <path
          data-tail
          className={styles.tail}
          d="M172 286 C 236 290, 240 214, 206 186 C 192 174, 196 158, 210 156"
        />
        {/* Corpo */}
        <path className={styles.body} d="M62 298 C 50 236, 70 178, 120 168 C 170 178, 190 236, 178 298 Z" />
        {/* Cabeça + orelha esquerda */}
        <path className={styles.body} d="M66 112 L 72 44 L 110 80 C 118 78, 140 78, 158 90 C 170 98, 175 104, 174 112 C 178 150, 154 176, 120 176 C 86 176, 62 150, 66 112 Z" />
        <path className={styles.earInner} d="M78 62 L 80 88 L 98 78 Z" />
        {/* Orelha direita separada para poder mexer */}
        <g data-ear>
          <path className={styles.body} d="M128 82 L 168 44 L 174 112 Z" />
          <path className={styles.earInner} d="M162 62 L 160 88 L 142 78 Z" />
        </g>

        {/* Olhos */}
        <g data-eye>
          <ellipse className={styles.eye} cx="98" cy="122" rx="14" ry="12" />
          <ellipse data-pupil className={styles.pupil} cx="98" cy="122" rx="3.6" ry="9.5" />
        </g>
        <g data-eye>
          <ellipse className={styles.eye} cx="142" cy="122" rx="14" ry="12" />
          <ellipse data-pupil className={styles.pupil} cx="142" cy="122" rx="3.6" ry="9.5" />
        </g>

        <path className={styles.nose} d="M114 144 L 126 144 L 120 151 Z" />
        <g className={styles.whiskers}>
          <path d="M84 148 L 34 140" />
          <path d="M84 154 L 36 160" />
          <path d="M156 148 L 206 140" />
          <path d="M156 154 L 204 160" />
        </g>
      </g>
    </svg>
  )
}
