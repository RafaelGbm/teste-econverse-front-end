import { brands } from '../data/brands'
import styles from '../styles/Brands.module.scss'

function Brands() {
  return (
    <section className={styles.brands}>
      <h2>Navegue por marcas</h2>
      <ul className={styles.list}>
        {brands.map(({ id, name, logo }) => (
          <li key={id}>
            <img src={logo} alt={name} width={117} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Brands
