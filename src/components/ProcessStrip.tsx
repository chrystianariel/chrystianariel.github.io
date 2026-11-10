import { useLang } from '../i18n/LanguageContext'
import SplitReveal from './SplitReveal'
import Reveal from './Reveal'
import styles from './ProcessStrip.module.css'

/** "Rápido onde pode. Lento onde importa." — as 4 etapas e onde a IA entra. */
export default function ProcessStrip() {
  const { t } = useLang()
  const { process } = t

  return (
    <section className={`container ${styles.section}`}>
      <p className="eyebrow">{process.eyebrow}</p>
      <SplitReveal text={process.title} className={`display ${styles.title}`} />
      <Reveal className={styles.grid}>
        {process.steps.map((step, i) => {
          const ai = step.tag.includes('+')
          return (
            <article key={step.title} className={`ticket ${styles.step}`}>
              {/* Canhoto do ingresso: acima da linha picotada */}
              <div className={styles.stub}>
                <div className={styles.top}>
                  <span className={styles.num}>Nº 0{i + 1}</span>
                  <span className={`${styles.tag} ${ai ? styles.tagAi : ''}`}>{step.tag}</span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              <p>{step.text}</p>
              {/* Lâmpadas acesas indicam a "velocidade": etapas humanas são mais longas */}
              <span className={`bulbs ${styles.pace}`} style={{ ['--pace' as string]: ai ? 0.45 : 1 }} aria-hidden />
            </article>
          )
        })}
      </Reveal>
    </section>
  )
}
