import styles from './InkArch.module.css'

type Props = {
  /**
   * Altura do arco em % da altura da moldura. Precisa ser o mesmo valor vertical
   * usado no --arch do elemento (ex.: --arch: 50% 50% 14px 14px / 34% … → h={34}).
   */
  h: number
}

// Fator para aproximar um quarto de elipse com uma curva cúbica
const K = 0.5523

/** Arco num quadro 0–100 esticado (preserveAspectRatio="none"), levemente torto de propósito. */
function archPath(h: number) {
  const c = h * (1 - K)
  const side = h + (100 - h) * 0.45
  return [
    `M0.3 100 C 0.6 ${side + 12}, -0.2 ${side}, 0 ${h}`,
    `C 0.2 ${c}, 22.4 0.4, 50 0`,
    `C 77.6 -0.3, 100.2 ${c}, 100 ${h}`,
    `C 99.8 ${side}, 100.4 ${side + 12}, 99.7 100 Z`,
  ].join(' ')
}

/**
 * Moldura em arco desenhada à mão, sobreposta a um elemento .arch-frame:
 * contorno de nanquim na borda, filete de latão, traço interno fino,
 * hachura nos cantos de baixo e um rebite no topo.
 */
export default function InkArch({ h }: Props) {
  const d = archPath(h)
  const layer = (className: string) => (
    <svg className={`${styles.layer} ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d={d} />
    </svg>
  )

  return (
    <span className={styles.frame} aria-hidden>
      {layer(styles.ink)}
      {layer(styles.brass)}
      {layer(styles.inner)}
      <svg className={`${styles.hatch} ${styles.hatchLeft}`} viewBox="0 0 20 20">
        <path d="M2 18 L 10 10 M2 10 L 8 4" />
      </svg>
      <svg className={`${styles.hatch} ${styles.hatchRight}`} viewBox="0 0 20 20">
        <path d="M18 18 L 10 10 M18 10 L 12 4" />
      </svg>
      <span className={styles.rivet} />
    </span>
  )
}
