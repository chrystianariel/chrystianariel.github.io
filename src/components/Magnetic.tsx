import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/motion'

type Props = { children: ReactNode; strength?: number }

/** Envolve um elemento e o "puxa" na direção do mouse quando o cursor está em cima. */
export default function Magnetic({ children, strength = 0.35 }: Props) {
  const wrap = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = wrap.current
      if (!el || !hasFinePointer() || prefersReducedMotion()) return
      const x = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const y = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - (r.left + r.width / 2)) * strength)
        y((e.clientY - (r.top + r.height / 2)) * strength)
      }
      const onLeave = () => {
        x(0)
        y(0)
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: wrap },
  )

  return (
    <span ref={wrap} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}
