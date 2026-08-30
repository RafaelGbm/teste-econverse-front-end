import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import styles from './ProductCard.module.scss'

// The endpoint carries a single price, but the layout also shows a struck-out
// list price and an instalment line. Both are derived from it, so the card
// never displays a figure the API did not provide.
const LIST_PRICE_MARKUP = 1.07
const INSTALMENTS = 2

type Props = {
  product: Product
  onSelect: (product: Product) => void
}

function ProductCard({ product, onSelect }: Props) {
  const { productName, descriptionShort, photo, price } = product

  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onSelect(product)}
    >
      <img className={styles.photo} src={photo} alt={productName} />

      <p className={styles.description}>{descriptionShort}</p>

      <p className={styles.listPrice}>{formatPrice(price * LIST_PRICE_MARKUP)}</p>
      <p className={styles.price}>{formatPrice(price)}</p>
      <p className={styles.instalments}>
        ou {INSTALMENTS}x de {formatPrice(price / INSTALMENTS)} sem juros
      </p>
      <p className={styles.shipping}>Frete grátis</p>

      <span className={styles.buy}>Comprar</span>
    </button>
  )
}

export default ProductCard
