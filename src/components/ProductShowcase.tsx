import { useState } from 'react'
import arrowIcon from '../assets/CarouselArrow.svg'
import { currentTab, productTabs } from '../data/showcase'
import type { FetchStatus } from '../hooks/useProducts'
import type { Product } from '../types/product'
import ProductCard from './ProductCard'
import styles from './ProductShowcase.module.scss'

// Four cards are visible at a time; the arrows advance one card per click.
const VISIBLE_CARDS = 4
const CARD_STEP = 322

type Props = {
  title: string
  products: Product[]
  status: FetchStatus
  onSelectProduct: (product: Product) => void
  withTabs?: boolean
}

function ProductShowcase({
  title,
  products,
  status,
  onSelectProduct,
  withTabs = false,
}: Props) {
  const [firstVisible, setFirstVisible] = useState(0)
  const lastReachable = Math.max(0, products.length - VISIBLE_CARDS)

  return (
    <section className={styles.showcase}>
      <h2 className={styles.title}>{title}</h2>

      {withTabs ? (
        <ul className={styles.tabs}>
          {productTabs.map((tab) => (
            <li
              key={tab}
              className={tab === currentTab ? styles.currentTab : undefined}
            >
              {tab}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.seeAll}>Ver todos</p>
      )}

      {status === 'loading' && <p className={styles.message}>Carregando produtos…</p>}

      {status === 'error' && (
        <p className={styles.message}>
          Não foi possível carregar os produtos. Tente novamente mais tarde.
        </p>
      )}

      {status === 'ready' && (
        <div className={styles.carousel}>
          <button
            type="button"
            className={styles.previous}
            onClick={() => setFirstVisible(firstVisible - 1)}
            disabled={firstVisible === 0}
            aria-label="Produtos anteriores"
          >
            <img src={arrowIcon} alt="" width={40} height={40} />
          </button>

          <div className={styles.viewport}>
            <ul
              className={styles.track}
              style={{ transform: `translateX(-${firstVisible * CARD_STEP}px)` }}
            >
              {products.map((product) => (
                <li key={product.productName}>
                  <ProductCard product={product} onSelect={onSelectProduct} />
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className={styles.next}
            onClick={() => setFirstVisible(firstVisible + 1)}
            disabled={firstVisible === lastReachable}
            aria-label="Próximos produtos"
          >
            <img src={arrowIcon} alt="" width={40} height={40} />
          </button>
        </div>
      )}
    </section>
  )
}

export default ProductShowcase
