import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

// Intervalo entre "quadros" do tremido, como animação desenhada à mão
const FRAME_MS = 150

/**
 * Filtro SVG compartilhado (`filter: url(#ink-boil)`) que deixa o contorno levemente torto.
 * A semente do ruído troca em passos, então o traço "ferve" como desenho quadro a quadro.
 * Com reduced motion, o traço fica torto mas parado.
 */
export default function InkFilter() {
  const noise = useRef<SVGFETurbulenceElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let elapsed = 0
    let seed = 1
    const tick = (_time: number, deltaTime: number) => {
      elapsed += deltaTime
      if (elapsed < FRAME_MS) return
      elapsed = 0
      seed = (seed % 3) + 1
      noise.current?.setAttribute('seed', String(seed))
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
      <filter id="ink-boil" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence ref={noise} type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="1" />
        <feDisplacementMap in="SourceGraphic" scale="1.6" />
      </filter>
    </svg>
  )
}
