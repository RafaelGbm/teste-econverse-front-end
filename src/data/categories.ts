import bebidasIcon from '../assets/Bebidas.svg'
import esportesIcon from '../assets/Esportes.svg'
import ferramentasIcon from '../assets/Ferramentas.svg'
import modaIcon from '../assets/Moda.svg'
import saudeIcon from '../assets/Saude.svg'
import supermercadoIcon from '../assets/Supermercado.svg'
import tecnologiaIcon from '../assets/Tecnologia.svg'
import type { Category } from '../types/category'

export const categories: Category[] = [
  { name: 'Tecnologia', icon: tecnologiaIcon, iconSize: 61 },
  { name: 'Supermercado', icon: supermercadoIcon, iconSize: 61 },
  { name: 'Bebidas', icon: bebidasIcon, iconSize: 61 },
  { name: 'Ferramentas', icon: ferramentasIcon, iconSize: 61 },
  { name: 'Saúde', icon: saudeIcon, iconSize: 61 },
  { name: 'Esportes e Fitness', icon: esportesIcon, iconSize: 61 },
  { name: 'Moda', icon: modaIcon, iconSize: 63 },
]

// The layout draws one category as the selected one.
export const currentCategory = 'Tecnologia'
