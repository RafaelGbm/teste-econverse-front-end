import crownIcon from '../../assets/CrownSimple.svg'
import styles from './MainNav.module.scss'

type Category = {
  name: string
  icon?: string
}

const categories: Category[] = [
  { name: 'Todas Categorias' },
  { name: 'Supermercado' },
  { name: 'Livros' },
  { name: 'Moda' },
  { name: 'Lançamentos' },
  { name: 'Ofertas do dia' },
  { name: 'Assinatura', icon: crownIcon },
]

// The layout highlights a single category as the current one.
const currentCategory = 'Ofertas do dia'

function MainNav() {
  return (
    <nav className={styles.nav} aria-label="Categorias">
      <ul className={styles.list}>
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
  )
}

export default MainNav
