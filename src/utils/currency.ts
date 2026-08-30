const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatPrice(value: number) {
  return formatter.format(value)
}
