import { useRef, type ElementType } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** Anima ao entrar na tela (padrão) ou imediatamente */
  onScroll?: boolean
  delay?: number
}

const mask = { display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.06em' } as const

/** Texto que sobe palavra por palavra, mascarado. Ótimo para títulos grandes. */
export default function SplitReveal({ text, as: Tag = 'h2', className, onScroll = true, delay = 0 }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-word]', {
        yPercent: 110,
        rotate: 4,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.05,
        delay,
        scrollTrigger: onScroll ? { trigger: root.current, start: 'top 88%' } : undefined,
      })
    },
    { scope: root, dependencies: [text], revertOnUpdate: true },
  )

  const words = text.split(' ')
  return (
    <Tag ref={root} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden style={mask}>
          <span data-word style={{ display: 'inline-block' }}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
