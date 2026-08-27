import heartIcon from '../../assets/Heart.svg'
import catalogIcon from '../../assets/Group.svg'
import logo from '../../assets/Logo.svg'
import magnifyingGlassIcon from '../../assets/MagnifyingGlass.svg'
import shoppingCartIcon from '../../assets/ShoppingCart.svg'
import userCircleIcon from '../../assets/UserCircle.svg'
import MainNav from './MainNav'
import TopBar from './TopBar'
import styles from './Header.module.scss'

const actions = [
  { icon: catalogIcon, label: 'Meus pedidos', size: 25 },
  { icon: heartIcon, label: 'Favoritos', size: 32 },
  { icon: userCircleIcon, label: 'Minha conta', size: 32 },
  { icon: shoppingCartIcon, label: 'Carrinho', size: 32 },
]

function Header() {
  return (
    <header className={styles.header}>
      <TopBar />

      <div className={styles.main}>
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

      <MainNav />
    </header>
  )
}

export default Header
