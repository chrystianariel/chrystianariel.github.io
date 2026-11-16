import { useId } from 'react'
import styles from './Festoon.module.css'

type Props = {
  className?: string
}

/**
 * Festão de lona desenhado à mão: varão de latão levemente torto e bicos
 * vermelhos e creme com contorno de nanquim, repetidos na largura toda.
 */
export default function Festoon({ className }: Props) {
  // Cada festão precisa do próprio id de pattern (há um na cortina e outro no rodapé)
  const id = `festoon-${useId().replace(/:/g, '')}`

  return (
    <div className={`${styles.festoon} ${className ?? ''}`} aria-hidden>
      <svg className={styles.flags}>
        <defs>
          {/* Dois bicos por ladrilho, levemente diferentes para não parecer carimbo */}
          <pattern id={id} width="76" height="30" patternUnits="userSpaceOnUse">
            <path className={styles.red} d="M0 0 L38 0 C 34 22, 24 28, 18 27 C 10 26, 3 18, 0 0 Z" />
            <path className={styles.cream} d="M38 0 L76 0 C 73 19, 64 27, 56 26 C 46 25, 40 17, 38 0 Z" />
          </pattern>
        </defs>
        <rect width="100%" height="30" fill={`url(#${id})`} />
      </svg>
      <svg className={styles.rod} viewBox="0 0 1000 12" preserveAspectRatio="none">
        <path d="M0 7 C 160 4, 340 9, 500 6 C 660 3, 840 9, 1000 5" />
      </svg>
    </div>
  )
}
