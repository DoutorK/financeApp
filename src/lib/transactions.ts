export type TransactionKind = 'income' | 'expense'
export type TransactionPeriod = 'week' | 'month' | 'year'
export type TransactionFilter = 'all' | TransactionKind

export type Transaction = {
  id: string
  title: string
  category: string
  amount: number
  kind: TransactionKind
  date: string
}

const STORAGE_KEY = 'finance-app:transactions:v1'

export function generateTransactionId() {
  return `tx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatShortDate(dateIso: string) {
  const date = new Date(`${dateIso}T00:00:00`)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(date)
}

export function getPeriodLabel(period: TransactionPeriod) {
  if (period === 'week') return 'Últimos 7 dias'
  if (period === 'month') return 'Mês atual'
  return 'Ano atual'
}

export function getPeriodBounds(period: TransactionPeriod, reference = new Date()) {
  const end = new Date(reference)
  end.setHours(23, 59, 59, 999)

  const start = new Date(reference)
  start.setHours(0, 0, 0, 0)

  if (period === 'week') {
    start.setDate(start.getDate() - 6)
    return { start, end }
  }

  if (period === 'month') {
    start.setDate(1)
    return { start, end }
  }

  start.setMonth(0, 1)
  return { start, end }
}

export function isTransactionInPeriod(
  transaction: Transaction,
  period: TransactionPeriod,
  reference = new Date(),
) {
  const { start, end } = getPeriodBounds(period, reference)
  const currentDate = new Date(`${transaction.date}T00:00:00`)
  return currentDate >= start && currentDate <= end
}

export function filterTransactionsByPeriod(
  transactions: ReadonlyArray<Transaction>,
  period: TransactionPeriod,
  reference = new Date(),
) {
  return transactions.filter((transaction) =>
    isTransactionInPeriod(transaction, period, reference),
  )
}

export function sortTransactionsDesc(transactions: ReadonlyArray<Transaction>) {
  return [...transactions].sort(
    (left, right) =>
      new Date(`${right.date}T00:00:00`).getTime() -
      new Date(`${left.date}T00:00:00`).getTime(),
  )
}

export function loadTransactionsFromStorage() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Transaction[]
  } catch {
    return []
  }
}

export function saveTransactionsToStorage(transactions: ReadonlyArray<Transaction>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}
