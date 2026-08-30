import { useEffect, useState } from 'react'
import type { Product } from '../types/product'

// Proxied through the dev/preview server — see the comment in vite.config.ts.
const PRODUCTS_URL = '/api/lista-produtos/produtos.json'

type ProductsResponse = {
  success: boolean
  products: Product[]
}

export type FetchStatus = 'loading' | 'ready' | 'error'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<FetchStatus>('loading')

  useEffect(() => {
    // Aborting on unmount keeps a late response from updating a gone component.
    const controller = new AbortController()

    fetch(PRODUCTS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Resposta ${response.status} do servidor`)
        }
        return response.json() as Promise<ProductsResponse>
      })
      .then((data) => {
        setProducts(data.products)
        setStatus('ready')
      })
      .catch((error: Error) => {
        if (error.name !== 'AbortError') {
          setStatus('error')
        }
      })

    return () => controller.abort()
  }, [])

  return { products, status }
}
