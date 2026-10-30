import { useRef, useState } from 'react'
import { gsap, useGSAP, hasFinePointer } from '../lib/motion'
import styles from './Cursor.module.css'

/**
 * Cursor custom: ponto âmbar + anel que segue com atraso.
 * Elementos com data-cursor="view" (e data-cursor-label) expandem o anel com um texto.
 * Só aparece em dispositivos com mouse.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [enabled] = useState(hasFinePointer)

  useGSAP(() => {
    if (!enabled || !dot.current || !ring.current) return
    document.documentElement.classList.add('has-cursor')

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

    let visible = false
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('a, button, [data-cursor]')
      const mode = el?.dataset.cursor ?? (el ? 'link' : 'default')
      ring.current!.dataset.mode = mode
      dot.current!.dataset.mode = mode
      setLabel(mode === 'view' ? el?.dataset.cursorLabel ?? '' : '')
    }

    const onLeave = () => {
      visible = false
      gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 })
    }

    window.addEventListener('pointermove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ring} className={styles.ring} data-mode="default" aria-hidden>
        <span className={styles.label}>{label}</span>
      </div>
      <div ref={dot} className={styles.dot} data-mode="default" aria-hidden />
    </>
  )
}
