import { useState } from 'react'
import styles from './InkStar.module.css'

type Props = {
  /** 'star' = 5 pontas, 'sparkle' = brilho de 4 pontas */
  variant?: 'star' | 'sparkle'
  className?: string
}

// Desenhadas à mão no espaço 100×100: pontas e lados levemente tortos de propósito
const SHAPES = {
  star: {
    body: 'M50 2 Q 57 20 63 35 Q 81 36 98 39 Q 83 50 70 60 Q 76 78 81 95 Q 66 85 50 75 Q 34 85 19 95 Q 24 78 30 60 Q 16 49 2 38 Q 20 37 37 35 Q 44 18 50 2 Z',
    hatch: 'M60 48 L 67 56 M57 60 L 65 68 M66 70 L 72 78',
  },
  sparkle: {
    body: 'M50 4 Q 56 40 94 50 Q 56 58 50 96 Q 43 58 6 50 Q 44 41 50 4 Z',
    hatch: 'M57 57 L 63 63 M54 65 L 60 71',
  },
}

/**
 * Estrela com contorno de nanquim e hachura, no tamanho da fonte (1em) e na cor do texto.
 * Cada instância nasce com uma inclinação diferente para não parecer carimbada,
 * e o filtro #ink-boil (InkFilter) faz o traço tremer de leve.
 */
export default function InkStar({ variant = 'sparkle', className }: Props) {
  const [tilt] = useState(() => Math.round(Math.random() * 24 - 12))
  const shape = SHAPES[variant]

  return (
    <svg
      className={`${styles.star} ${className ?? ''}`}
      viewBox="0 0 100 100"
      style={{ rotate: `${tilt}deg` }}
      aria-hidden
      focusable="false"
    >
      <path className={styles.body} d={shape.body} />
      <path className={styles.hatch} d={shape.hatch} />
    </svg>
  )
}
