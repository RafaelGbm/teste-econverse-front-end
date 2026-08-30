import { useEffect, useRef, useState } from 'react'
import arrowIcon from '../assets/CarouselArrow.svg'
import { currentTab, productTabs } from '../data/showcase'
import type { FetchStatus } from '../hooks/useProducts'
import styles from '../styles/ProductShowcase.module.scss'
import type { Product } from '../types/product'
import ProductCard from './ProductCard'

const CARD_GAP = 18

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
  const [visibleCards, setVisibleCards] = useState(1)
  const [step, setStep] = useState(0)
  const viewport = useRef<HTMLDivElement>(null)

  // Both how far a click travels and how many cards fit are measurements
  // rather than constants: the card is 304px wide at the design width and
  // fills the viewport on a phone, and the stylesheet is what decides that.
  useEffect(() => {
    const element = viewport.current
    if (!element) {
      return
    }

    const measure = () => {
      const card = element.querySelector('li')
      if (!card) {
        return
      }

      const cardStep = card.getBoundingClientRect().width + CARD_GAP
      setStep(cardStep)
      setVisibleCards(
        Math.max(1, Math.floor((element.clientWidth + CARD_GAP) / cardStep)),
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [products])

  // Clamping on read keeps the carousel from stranding past the last card
  // when the window widens and more of them become visible.
  const lastReachable = Math.max(0, products.length - visibleCards)
  const offset = Math.min(firstVisible, lastReachable)

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

      {status === 'loading' && (
        <p className={styles.message}>Carregando produtos…</p>
      )}

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
            onClick={() => setFirstVisible(offset - 1)}
            disabled={offset === 0}
            aria-label="Produtos anteriores"
          >
            <img src={arrowIcon} alt="" width={40} height={40} />
          </button>

          <div className={styles.viewport} ref={viewport}>
            <ul
              className={styles.track}
              style={{ transform: `translateX(-${offset * step}px)` }}
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
            onClick={() => setFirstVisible(offset + 1)}
            disabled={offset === lastReachable}
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
