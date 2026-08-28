import creditCardIcon from '../assets/CreditCard.svg'
import crownIcon from '../assets/CrownSimple.svg'
import catalogIcon from '../assets/Group.svg'
import heartIcon from '../assets/Heart.svg'
import shieldCheckIcon from '../assets/ShieldCheck.svg'
import shoppingCartIcon from '../assets/ShoppingCart.svg'
import truckIcon from '../assets/Truck.svg'
import userCircleIcon from '../assets/UserCircle.svg'
import type { Category, HeaderAction, Notice } from '../types/header'

export const notices: Notice[] = [
  {
    icon: shieldCheckIcon,
    before: 'Compra ',
    highlight: '100% segura',
    after: '',
  },
  {
    icon: truckIcon,
    before: '',
    highlight: 'Frete grátis',
    after: ' acima de R$ 200',
  },
  {
    icon: creditCardIcon,
    before: '',
    highlight: 'Parcele',
    after: ' suas compras',
  },
]

export const actions: HeaderAction[] = [
  { icon: catalogIcon, label: 'Meus pedidos', size: 25 },
  { icon: heartIcon, label: 'Favoritos', size: 32 },
  { icon: userCircleIcon, label: 'Minha conta', size: 32 },
  { icon: shoppingCartIcon, label: 'Carrinho', size: 32 },
]

export const categories: Category[] = [
  { name: 'Todas Categorias' },
  { name: 'Supermercado' },
  { name: 'Livros' },
  { name: 'Moda' },
  { name: 'Lançamentos' },
  { name: 'Ofertas do dia' },
  { name: 'Assinatura', icon: crownIcon },
]

export const currentCategory = 'Ofertas do dia'
