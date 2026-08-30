import { partnerBanners } from '../data/partners'
import styles from '../styles/PartnerBanners.module.scss'

function PartnerBanners() {
  return (
    <section className={styles.banners} aria-label="Parceiros">
      {partnerBanners.map(({ id, title, text }) => (
        <article key={id} className={styles.banner}>
          <h2>{title}</h2>
          <p>{text}</p>
          <a href="#" className={styles.action}>
            Confira
          </a>
        </article>
      ))}
    </section>
  )
}

export default PartnerBanners
