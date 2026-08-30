import { useEffect, useState } from 'react'
import minusIcon from '../assets/Minus.svg'
import plusIcon from '../assets/Plus.svg'
import styles from '../styles/ProductModal.module.scss'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'

type Props = {
  product: Product
  onClose: () => void
}

function ProductModal({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  useEffect(() => {
    // Stop the page behind the modal from scrolling while it is open.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={product.productName}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Fechar"
        >
          <svg width="15" height="13" viewBox="0 0 15 13" aria-hidden="true">
            <line x1="1" y1="1" x2="14" y2="12" />
            <line x1="14" y1="1" x2="1" y2="12" />
          </svg>
        </button>

        <img
          className={styles.photo}
          src={product.photo}
          alt={product.productName}
        />

        <div className={styles.info}>
          <div className={styles.headline}>
            <h2>{product.productName}</h2>
            <p className={styles.price}>{formatPrice(product.price)}</p>
          </div>

          <div className={styles.details}>
            <p className={styles.description}>{product.descriptionShort}</p>
            <a className={styles.more} href="#">
              Veja mais detalhes do produto &gt;
            </a>
          </div>

          <div className={styles.actions}>
            <div className={styles.quantity}>
              <button
                type="button"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
                aria-label="Diminuir quantidade"
              >
                <img src={minusIcon} alt="" width={20} height={20} />
              </button>
              <span>{String(quantity).padStart(2, '0')}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Aumentar quantidade"
              >
                <img src={plusIcon} alt="" width={20} height={20} />
              </button>
            </div>

            <button type="button" className={styles.buy}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
