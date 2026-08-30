import logo from '../assets/LogoFooter.svg'
import { footerColumns, socialLinks } from '../data/footer'
import styles from '../styles/Footer.module.scss'

function Footer() {
  return (
    <footer>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <div className={styles.identity}>
              <img src={logo} alt="Econverse" width={164} height={48} />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <ul className={styles.social}>
              {socialLinks.map(({ id, name, icon }) => (
                <li key={id}>
                  <a href="#" aria-label={name}>
                    <img src={icon} alt="" width={24} height={24} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <span className={styles.divider} />

          <div className={styles.columns}>
            {footerColumns.map(({ id, title, links }) => (
              <nav key={id} className={styles.column} aria-label={title}>
                <h3>{title}</h3>
                <ul>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.copyright}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </footer>
  )
}

export default Footer
