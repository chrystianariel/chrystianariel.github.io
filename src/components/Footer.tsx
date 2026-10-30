import { useLang } from '../i18n/LanguageContext'
import { scrollToTop } from '../lib/SmoothScroll'
import Magnetic from './Magnetic'
import SplitReveal from './SplitReveal'
import BlackCat from './BlackCat'
import styles from './Footer.module.css'

const LINKEDIN = 'https://www.linkedin.com/in/chrystian-ariel'

/** Contato + rodapé, presente em todas as páginas. */
export default function Footer() {
  const { t } = useLang()
  const { contact, footer } = t

  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.contact}`}>
        <div>
          <p className="eyebrow">{contact.eyebrow}</p>
          <SplitReveal text={contact.title} className={`display ${styles.title}`} />
          <p className={styles.text}>{contact.text}</p>

          <div className={styles.actions}>
            <Magnetic>
              <a className={styles.email} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </Magnetic>
            <div className={styles.secondary}>
              <Magnetic>
                <a className={styles.pill} href={LINKEDIN} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </Magnetic>
              <Magnetic>
                <a className={styles.pill} href="/Chrystian_Balem.pdf" download="Chrystian_Balem.pdf" target="_blank" rel="noreferrer">
                  {contact.cv} ↓
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
        <div className={styles.cat}>
          <BlackCat moon={false} />
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} Chrystian Ariel. {footer.rights}
        </span>
        <span>{footer.built}</span>
        <button onClick={() => scrollToTop()} className={styles.top}>
          {footer.top} ↑
        </button>
      </div>
    </footer>
  )
}
