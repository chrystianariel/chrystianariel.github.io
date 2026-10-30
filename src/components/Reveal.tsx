import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'

type Props = { children: ReactNode; className?: string; y?: number; stagger?: number }

/** Faz os filhos diretos surgirem (fade + subida) quando entram na tela. */
export default function Reveal({ children, className, y = 40, stagger = 0.08 }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      gsap.from(root.current.children, {
        y,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger,
        scrollTrigger: { trigger: root.current, start: 'top 88%' },
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  )
}
