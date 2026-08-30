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
  const [step, setStep] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
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
      setAtEnd(element.scrollLeft >= element.scrollWidth - element.clientWidth - 1)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [products])

  const readPosition = () => {
    const element = viewport.current
    if (!element || !step) {
      return
    }

    setIndex(Math.round(element.scrollLeft / step))
    setAtStart(element.scrollLeft <= 1)
    setAtEnd(element.scrollLeft >= element.scrollWidth - element.clientWidth - 1)
  }

  const scrollTo = (position: number) => {
    viewport.current?.scrollTo({ left: position * step, behavior: 'smooth' })
  }

  const stops = Math.max(1, products.length - visibleCards + 1)

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
        <>
          <div className={styles.carousel}>
            <button
              type="button"
              className={styles.previous}
              onClick={() => scrollTo(index - 1)}
              disabled={atStart}
              aria-label="Produtos anteriores"
            >
              <img src={arrowIcon} alt="" width={40} height={40} />
            </button>

            <div
              className={styles.viewport}
              ref={viewport}
              onScroll={readPosition}
            >
              <ul className={styles.track}>
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
              onClick={() => scrollTo(index + 1)}
              disabled={atEnd}
              aria-label="Próximos produtos"
            >
              <img src={arrowIcon} alt="" width={40} height={40} />
            </button>
          </div>

          {/* Only shown where the carousel is swiped instead of clicked, as
              the cue that there is more to the side. */}
          <ol className={styles.dots}>
            {Array.from({ length: stops }, (_, stop) => (
              <li key={stop}>
                <button
                  type="button"
                  className={stop === index ? styles.currentDot : undefined}
                  onClick={() => scrollTo(stop)}
                  aria-label={`Ir para o produto ${stop + 1}`}
                />
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  )
}

export default ProductShowcase
