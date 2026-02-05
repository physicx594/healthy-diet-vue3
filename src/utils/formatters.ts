export function formatMoney(num: number | undefined | null): string {
  if (num === undefined || num === null) return 'NT $0'
  const parts = num.toString().split('.')
  parts[0] = parts[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return 'NT $' + parts.join('.')
}

export function truncateOrderId(id: string): string {
  return id.slice(0, 20)
}
