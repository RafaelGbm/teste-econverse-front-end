import { useCallback, useState } from 'react'
import Banner from './components/Banner'
import Categories from './components/Categories'
import Header from './components/Header'
import PartnerBanners from './components/PartnerBanners'
import ProductModal from './components/ProductModal'
import ProductShowcase from './components/ProductShowcase'
import { useProducts } from './hooks/useProducts'
import type { Product } from './types/product'

function App() {
  const { products, status } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const closeModal = useCallback(() => setSelectedProduct(null), [])

  return (
    <>
      <Header />
      <main>
        <Banner />
        <Categories />
        <ProductShowcase
          title="Produtos relacionados"
          products={products}
          status={status}
          onSelectProduct={setSelectedProduct}
          withTabs
        />
        <PartnerBanners />
        <ProductShowcase
          title="Produtos relacionados"
          products={products}
          status={status}
          onSelectProduct={setSelectedProduct}
        />
        <PartnerBanners />
      </main>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  )
}

export default App
