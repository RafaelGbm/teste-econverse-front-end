import creditCardIcon from '../../assets/CreditCard.svg'
import shieldCheckIcon from '../../assets/ShieldCheck.svg'
import truckIcon from '../../assets/Truck.svg'
import styles from './TopBar.module.scss'

function TopBar() {
  return (
    <div className={styles.topBar}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <img src={shieldCheckIcon} alt="" width={20} height={20} />
          Compra <strong>100% segura</strong>
        </li>
        <li className={styles.item}>
          <img src={truckIcon} alt="" width={20} height={20} />
          <strong>Frete grátis</strong> acima de R$ 200
        </li>
        <li className={styles.item}>
          <img src={creditCardIcon} alt="" width={20} height={20} />
          <strong>Parcele</strong> suas compras
        </li>
      </ul>
    </div>
  )
}

export default TopBar
