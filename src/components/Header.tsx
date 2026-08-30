import logo from '../assets/Logo.svg'
import magnifyingGlassIcon from '../assets/MagnifyingGlass.svg'
import { actions, categories, currentCategory, notices } from '../data/header'
import styles from '../styles/Header.module.scss'

function Header() {
  return (
    <header>
      <ul className={styles.topBar}>
        {notices.map(({ icon, before, highlight, after }) => (
          <li key={highlight}>
            <img src={icon} alt="" width={20} height={20} />
            {before}
            <strong>{highlight}</strong>
            {after}
          </li>
        ))}
      </ul>

      <div className={styles.mainBar}>
        <div className={styles.side}>
          <a href="/">
            <img src={logo} alt="Econverse" width={139} height={42} />
          </a>
        </div>

        <form className={styles.search} role="search">
          <input
            type="search"
            name="q"
            placeholder="O que você está buscando?"
            aria-label="Buscar produtos"
          />
          <button type="submit" aria-label="Buscar">
            <img src={magnifyingGlassIcon} alt="" width={28} height={28} />
          </button>
        </form>

        <ul className={styles.actions}>
          {actions.map(({ icon, label, size }) => (
            <li key={label}>
              <a href="#" aria-label={label}>
                <img src={icon} alt="" width={size} height={size} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav aria-label="Categorias">
        <ul className={styles.categories}>
          {categories.map(({ name, icon }) => {
            const isCurrent = name === currentCategory

            return (
              <li key={name}>
                <a
                  href="#"
                  className={isCurrent ? styles.current : undefined}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {icon && <img src={icon} alt="" width={20} height={20} />}
                  {name}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Header
