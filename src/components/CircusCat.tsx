import { useId, useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import styles from './CircusCat.module.css'

type Props = {
  className?: string
  /** Desenha o holofote atrás do gato */
  spotlight?: boolean
}

// Distância máxima (em unidades do viewBox) que a pupila anda dentro do olho semicerrado
const PUPIL_X = 3
const PUPIL_Y = 1.5

// Desenho feito à mão num espaço de 680 de largura; o viewBox recorta só a cena do gato.
// Pivôs das animações, nas mesmas coordenadas do desenho:
const BALL = { x: 340, y: 300, r: 52 }
const CONTACT = `${BALL.x} 250` // onde o gato toca a bola (contrapeso)
const TAIL_BASE = '376 244'
const EAR_BASE = '362 125'

// Contorno torto da bola, usado no preenchimento, no recorte das faixas e no traço
const BALL_PATH =
  'M340 248 C 371 247, 393 270, 392 300 C 393 330, 369 353, 339 352 C 308 353, 287 328, 288 299 C 287 270, 310 248, 340 248 Z'
const TAIL_PATH =
  'M376 244 C 404 246, 414 222, 406 198 C 398 176, 386 156, 396 132 C 402 118, 416 116, 420 126'
const BODY_PATH =
  'M312 190 C 304 210, 296 232, 298 248 C 300 256, 380 256, 382 248 C 384 232, 376 210, 368 190 C 356 184, 324 184, 312 190 Z'
const HEAD_PATH =
  'M300 146 C 298 126, 316 114, 340 114 C 364 114, 382 126, 380 146 C 382 154, 386 160, 392 166 L 382 168 L 389 176 L 374 176 C 366 184, 354 188, 340 188 C 326 188, 314 184, 306 176 L 291 176 L 298 168 L 288 166 C 294 160, 298 154, 300 146 Z'

/**
 * Gato preto sentado e emburrado, em traço de nanquim, equilibrado numa bola listrada.
 * Os olhos seguem o mouse (ou o toque), ele pisca, balança o rabo e mexe a orelha nos links.
 * A bola rola com o movimento horizontal do mouse (ou com a rolagem no mobile)
 * e o gato inclina para o lado oposto, fazendo contrapeso.
 */
export default function CircusCat({ className, spotlight = true }: Props) {
  const root = useRef<SVGSVGElement>(null)
  // Ids únicos: o gato aparece no hero e no rodapé ao mesmo tempo
  const uid = useId().replace(/:/g, '')
  const spotId = `cc-spot-${uid}`
  const clipId = `cc-ball-${uid}`

  useGSAP(
    () => {
      const svg = root.current
      if (!svg) return
      const reduced = prefersReducedMotion()
      const ballEl = svg.querySelector('[data-ball]')
      const leanEl = svg.querySelector('[data-lean]')

      // Entrada: a bola rola até o lugar e o gato sobe nela
      if (!reduced) {
        gsap.from(svg.querySelector('[data-ball-wrap]'), { x: -60, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.2 })
        gsap.from(ballEl, { rotation: -200, transformOrigin: '50% 50%', duration: 1.2, ease: 'expo.out', delay: 0.2 })
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
        const cy = r.top + r.height * 0.3
        const dx = gsap.utils.clamp(-1, 1, (clientX - cx) / (window.innerWidth / 2))
        const dy = gsap.utils.clamp(-1, 1, (clientY - cy) / (window.innerHeight / 2))
        movers.forEach((m) => {
          m.x(dx * PUPIL_X)
          m.y(dy * PUPIL_Y)
        })
      }

      // Bola rola e o gato faz contrapeso
      const ball = gsap.quickTo(ballEl, 'rotation', { duration: 0.9, ease: 'power3.out' })
      const lean = gsap.quickTo(leanEl, 'rotation', { duration: 0.7, ease: 'power3.out' })
      // As faixas ficam num grupo com um círculo invisível do tamanho da bola: o centro dele é o centro da bola
      gsap.set(ballEl, { transformOrigin: '50% 50%' })
      gsap.set(leanEl, { svgOrigin: CONTACT })

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
        rotation: 7,
        svgOrigin: TAIL_BASE,
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
          { rotation: 12, svgOrigin: EAR_BASE, duration: 0.12, yoyo: true, repeat: 3, ease: 'power1.inOut' },
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
      viewBox="210 74 260 296"
      role="img"
      aria-label="Gato preto equilibrista"
    >
      <defs>
        <linearGradient id={spotId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--c-cream)" stopOpacity="0.3" />
          <stop offset="1" stopColor="var(--c-cream)" stopOpacity="0.04" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={BALL_PATH} />
        </clipPath>
      </defs>

      {spotlight && <path d="M318 22 L362 22 L470 368 L210 368 Z" fill={`url(#${spotId})`} />}

      {/* Sombra no chão */}
      <ellipse className={styles.shadow} cx="340" cy="359" rx="50" ry="6" />

      {/* Bola: as faixas giram dentro do contorno; hachura e brilho ficam parados para dar volume */}
      <g data-ball-wrap>
        <path className={styles.ballBase} d={BALL_PATH} />
        <g clipPath={`url(#${clipId})`}>
          <g data-ball>
            <circle cx={BALL.x} cy={BALL.y} r={BALL.r} fill="none" />
            <path className={styles.ballBand} d="M314 255 C 328 282, 328 322, 314 345 L 328 350 C 343 322, 343 280, 328 251 Z" />
            <path className={styles.ballBand} d="M352 250 C 366 280, 366 320, 352 350 L 366 345 C 380 318, 380 282, 366 255 Z" />
          </g>
        </g>
        <path className={styles.ballHatch} d="M370 334 L 382 320 M362 342 L 376 326 M378 322 L 386 310" />
        <path className={styles.ballShine} d="M300 280 Q304 264 318 257" />
        <path className={styles.ballRim} d={BALL_PATH} />
      </g>

      {/* Gato: inclina em torno do ponto em que toca a bola */}
      <g data-lean>
        <g data-cat>
          {/* Rabo: contorno de nanquim largo por baixo, pelo por cima */}
          <g data-tail>
            <path className={styles.tailInk} d={TAIL_PATH} />
            <path className={styles.tailFur} d={TAIL_PATH} />
            <path className={styles.ink} d="M420 128 L 426 132 M417 130 L 419 137" />
            <path className={styles.hatch} d="M410 212 C 412 200, 410 190, 404 182" />
          </g>

          {/* Corpo em sino */}
          <path className={styles.fur} d={BODY_PATH} />
          <path className={styles.sketch} d="M312 190 C 304 210, 296 232, 298 248 M382 248 C 384 232, 376 210, 368 190" transform="translate(-1.3 1)" />
          <path className={styles.line} d="M306 228 C 313 234, 317 243, 317 253 M374 228 C 367 234, 363 243, 363 253" />
          <path className={styles.lineBold} d="M329 206 C 327 222, 327 238, 328 249 M351 206 C 353 222, 353 238, 352 249" />
          <ellipse className={styles.paw} cx="322" cy="251" rx="9" ry="4.5" />
          <ellipse className={styles.paw} cx="358" cy="251" rx="9" ry="4.5" />
          <path className={styles.toes} d="M319 251 L 319 248 M325 251 L 325 248 M355 251 L 355 248 M361 251 L 361 248" />
          <path className={styles.hatch} d="M372 206 L 377 214 M375 220 L 379 228" />
          <path className={styles.hatch} d="M332 199 L 335 206 L 338 199 L 341 206 L 344 199 L 347 206" />

          {/* Gola de palhaço costurada */}
          <path className={styles.collar} d="M314 188 Q 340 199 366 188" />
          <path className={styles.stitch} d="M322 191 L 323 196 M331 194 L 331 199 M340 195 L 340 200 M349 194 L 349 199 M358 191 L 357 196" />

          {/* Orelha esquerda */}
          <path className={styles.fur} d="M304 132 L 297 89 L 331 118 Z" />
          <path className={styles.earInner} d="M307 124 L 302 101 L 323 119 Z" />
          <path className={styles.ink} d="M297 89 L 293 81 M297 89 L 300 80" />
          {/* Orelha direita separada para poder mexer */}
          <g data-ear>
            <path className={styles.fur} d="M349 118 L 383 89 L 376 132 Z" />
            <path className={styles.earInner} d="M357 119 L 378 101 L 373 124 Z" />
            <path className={styles.ink} d="M383 89 L 387 81 M383 89 L 380 80" />
          </g>

          {/* Cabeça larga com bochechas felpudas */}
          <path className={styles.fur} d={HEAD_PATH} />
          <path className={styles.sketch} d="M300 146 C 298 126, 316 114, 340 114 C 364 114, 382 126, 380 146" transform="translate(1.3 -1.2)" />
          <path className={styles.hatch} d="M330 122 L 332 130 M340 119 L 340 128 M350 122 L 348 130" />

          {/* Olhos semicerrados ("cara de bravo") */}
          <g data-eye>
            <path className={styles.eye} d="M313 148 L 335 153 Q 333 162 323 162 Q 313 161 313 148 Z" />
            <circle data-pupil className={styles.pupil} cx="325" cy="157" r="2.4" />
          </g>
          <g data-eye>
            <path className={styles.eye} d="M367 148 L 345 153 Q 347 162 357 162 Q 367 161 367 148 Z" />
            <circle data-pupil className={styles.pupil} cx="355" cy="157" r="2.4" />
          </g>
          <path className={styles.brow} d="M309 144 L 337 151 M371 144 L 343 151" />

          <path className={styles.nose} d="M336 167 L 344 167 L 340 171 Z" />
          <path className={styles.mouth} d="M340 171 L 340 174 M334 177 Q 340 173 346 177" />
          <path className={styles.whiskers} d="M318 170 L 284 163 M318 174 L 286 180 M362 170 L 396 163 M362 174 L 394 180" />
        </g>
      </g>
    </svg>
  )
}
