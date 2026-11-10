import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import styles from './CircusCat.module.css'

type Props = {
  className?: string
  /** Desenha o holofote atrás do gato */
  spotlight?: boolean
}

// Distância máxima (em unidades do viewBox do gato) que a pupila anda dentro do olho
const PUPIL_X = 6
const PUPIL_Y = 4

// O gato é desenhado no espaço 240×300 e encolhido para ficar em pé sobre a bola
const CAT_SCALE = 0.72
const CAT_X = 33.6
const CAT_Y = 1.4
/** Converte um ponto do desenho do gato para o espaço global do SVG (usado no svgOrigin) */
const toGlobal = (x: number, y: number) => `${x * CAT_SCALE + CAT_X} ${y * CAT_SCALE + CAT_Y}`

// Bola
const BALL_X = 120
const BALL_Y = 270
const BALL_R = 56

/**
 * Gato equilibrista em SVG, em pé sobre uma bola listrada.
 * Os olhos seguem o mouse (ou o toque), ele pisca, balança o rabo e mexe a orelha nos links.
 * A bola rola com o movimento horizontal do mouse (ou com a rolagem no mobile)
 * e o gato inclina para o lado oposto, fazendo contrapeso.
 */
export default function CircusCat({ className, spotlight = true }: Props) {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const svg = root.current
      if (!svg) return
      const reduced = prefersReducedMotion()

      // Entrada: a bola rola até o lugar e o gato sobe nela
      if (!reduced) {
        gsap.from(svg.querySelector('[data-ball-wrap]'), { x: -60, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.2 })
        gsap.from(svg.querySelector('[data-ball]'), { rotation: -200, transformOrigin: '50% 50%', duration: 1.2, ease: 'expo.out', delay: 0.2 })
        gsap.from(svg.querySelector('[data-cat]'), { y: -40, opacity: 0, duration: 1, ease: 'back.out(1.6)', delay: 0.7 })
      }

      // Pupilas seguem o ponteiro
      const pupils = gsap.utils.toArray<SVGElement>('[data-pupil]', svg)
      const movers = pupils.map((p) => ({
        x: gsap.quickTo(p, 'x', { duration: 0.6, ease: 'power3.out' }),
        y: gsap.quickTo(p, 'y', { duration: 0.6, ease: 'power3.out' }),
      }))

      const look = (clientX: number, clientY: number) => {
        const r = svg.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height * 0.25
        const dx = gsap.utils.clamp(-1, 1, (clientX - cx) / (window.innerWidth / 2))
        const dy = gsap.utils.clamp(-1, 1, (clientY - cy) / (window.innerHeight / 2))
        movers.forEach((m) => {
          m.x(dx * PUPIL_X)
          m.y(dy * PUPIL_Y)
        })
      }

      // Bola rola e o gato faz contrapeso
      const ball = gsap.quickTo(svg.querySelector('[data-ball]'), 'rotation', { duration: 0.9, ease: 'power3.out' })
      const lean = gsap.quickTo(svg.querySelector('[data-lean]'), 'rotation', { duration: 0.7, ease: 'power3.out' })
      // As faixas são simétricas: o centro do grupo é o centro da bola
      gsap.set(svg.querySelector('[data-ball]'), { transformOrigin: '50% 50%' })
      gsap.set(svg.querySelector('[data-lean]'), { svgOrigin: `${BALL_X} ${BALL_Y - BALL_R}` })

      let angle = 0
      const settle = gsap.delayedCall(0.15, () => lean(0)).pause()
      const roll = (delta: number) => {
        if (reduced || !delta) return
        angle += delta * 0.45
        ball(angle)
        lean(gsap.utils.clamp(-8, 8, -delta * 0.3))
        settle.restart(true)
      }

      let lastX: number | null = null
      const onMove = (e: PointerEvent) => {
        look(e.clientX, e.clientY)
        if (lastX !== null) roll(e.clientX - lastX)
        lastX = e.clientX
      }
      let lastScroll = window.scrollY
      const onScroll = () => {
        roll((window.scrollY - lastScroll) * 0.4)
        lastScroll = window.scrollY
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerdown', onMove)
      window.addEventListener('scroll', onScroll, { passive: true })

      const cleanup = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerdown', onMove)
        window.removeEventListener('scroll', onScroll)
        settle.kill()
      }
      if (reduced) return cleanup

      // Piscar em intervalos aleatórios
      const eyes = svg.querySelectorAll('[data-eye]')
      gsap
        .timeline({ repeat: -1, repeatDelay: 3.2, delay: 2.4, repeatRefresh: true })
        .to(eyes, { scaleY: 0.08, transformOrigin: '50% 50%', duration: 0.08, ease: 'power2.in' })
        .to(eyes, { scaleY: 1, duration: 0.14, ease: 'power2.out' })

      // Rabo balançando
      gsap.to(svg.querySelector('[data-tail]'), {
        rotation: 9,
        svgOrigin: toGlobal(178, 286),
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
          { rotation: -14, svgOrigin: toGlobal(150, 92), duration: 0.12, yoyo: true, repeat: 3, ease: 'power1.inOut' },
        )
      }
      document.addEventListener('mouseover', onOver)

      return () => {
        cleanup()
        document.removeEventListener('mouseover', onOver)
      }
    },
    { scope: root },
  )

  return (
    <svg
      ref={root}
      className={`${styles.cat} ${className ?? ''}`}
      viewBox="0 0 240 340"
      role="img"
      aria-label="Gato equilibrista"
    >
      <defs>
        <linearGradient id="cc-spot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--c-cream)" stopOpacity="0.32" />
          <stop offset="1" stopColor="var(--c-cream)" stopOpacity="0.04" />
        </linearGradient>
        <clipPath id="cc-ball">
          <circle cx={BALL_X} cy={BALL_Y} r={BALL_R} />
        </clipPath>
      </defs>

      {spotlight && (
        <g>
          <path className={styles.spot} d="M100 -20 L140 -20 L236 332 L4 332 Z" fill="url(#cc-spot)" />
          <ellipse className={styles.spotFloor} cx="120" cy="330" rx="112" ry="10" />
        </g>
      )}

      {/* Sombra no chão */}
      <ellipse className={styles.shadow} cx={BALL_X} cy="330" rx="58" ry="6" />

      <g data-ball-wrap>
        {/* Bola: as faixas giram, o brilho e a sombra ficam parados para dar volume */}
        <g clipPath="url(#cc-ball)">
          <circle className={styles.ballBase} cx={BALL_X} cy={BALL_Y} r={BALL_R} />
          <g data-ball>
            <ellipse className={styles.ballBand} cx={BALL_X} cy={BALL_Y} rx="17" ry={BALL_R + 2} />
            <ellipse className={styles.ballBand} cx={BALL_X} cy={BALL_Y} rx="17" ry={BALL_R + 2} transform={`rotate(60 ${BALL_X} ${BALL_Y})`} />
            <ellipse className={styles.ballBand} cx={BALL_X} cy={BALL_Y} rx="17" ry={BALL_R + 2} transform={`rotate(-60 ${BALL_X} ${BALL_Y})`} />
            <circle className={styles.ballHub} cx={BALL_X} cy={BALL_Y} r="9" />
          </g>
          <circle className={styles.ballShade} cx={BALL_X + 22} cy={BALL_Y + 24} r={BALL_R} />
          <ellipse className={styles.ballShine} cx={BALL_X - 22} cy={BALL_Y - 26} rx="16" ry="9" transform={`rotate(-30 ${BALL_X - 22} ${BALL_Y - 26})`} />
        </g>
        <circle className={styles.ballRim} cx={BALL_X} cy={BALL_Y} r={BALL_R} />
      </g>

      {/* Gato: inclina em torno do ponto em que toca a bola */}
      <g data-lean>
        <g transform={`translate(${CAT_X} ${CAT_Y}) scale(${CAT_SCALE})`}>
          <g data-cat>
            <path data-tail className={styles.tail} d="M172 286 C 236 290, 240 214, 206 186 C 192 174, 196 158, 210 156" />
            {/* Corpo e patas */}
            <path className={styles.body} d="M66 296 C 54 236, 72 178, 120 168 C 168 178, 186 236, 174 296 Z" />
            <ellipse className={styles.body} cx="96" cy="296" rx="20" ry="10" />
            <ellipse className={styles.body} cx="144" cy="296" rx="20" ry="10" />
            {/* Gola de palhaço */}
            <path className={styles.collar} d="M78 172 Q 90 192 102 174 Q 111 194 120 176 Q 129 194 138 174 Q 150 192 162 172 Q 140 186 120 184 Q 100 186 78 172 Z" />
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
        </g>
      </g>
    </svg>
  )
}
