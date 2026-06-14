import { TransactionItem } from './TransactionItem'

export type MovementTransaction = {
  id: string
  title: string
  category: string
  amount: number
  kind: 'income' | 'expense'
  date: string
}

export type MovementFilter = 'all' | 'income' | 'expense'

type MovementsScreenProps = {
  transactions: ReadonlyArray<MovementTransaction>
  query: string
  filter: MovementFilter
  onQueryChange: (value: string) => void
  onFilterChange: (value: MovementFilter) => void
  onDelete: (id: string) => void
}

const filterOptions: Array<{ label: string; value: MovementFilter }> = [
  { label: 'Todos', value: 'all' },
  { label: 'Receitas', value: 'income' },
  { label: 'Despesas', value: 'expense' },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

export function MovementsScreen({
  transactions,
  query,
  filter,
  onQueryChange,
  onFilterChange,
  onDelete,
}: MovementsScreenProps) {
  const normalizedQuery = query.trim().toLowerCase()

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === 'all' || transaction.kind === filter
    const matchesQuery =
      normalizedQuery.length === 0 ||
      transaction.title.toLowerCase().includes(normalizedQuery) ||
      transaction.category.toLowerCase().includes(normalizedQuery)

    return matchesFilter && matchesQuery
  })

  const incomeCount = transactions.filter((transaction) => transaction.kind === 'income').length
  const expenseCount = transactions.filter((transaction) => transaction.kind === 'expense').length

  return (
    <section className="grid gap-4">
      <div className="rounded-[1.5rem] border border-outline-variant bg-surface-container p-4 shadow-soft">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-text-variant">
          Tela de movimentos
        </p>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="m-0 text-lg font-medium tracking-[-0.02em] text-text">
              Movimentos
            </h2>
            <p className="m-0 text-sm text-text-variant">
              Busque, filtre e remova seus registros.
            </p>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-900">
            {filteredTransactions.length} itens
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-[1.5rem] border border-outline-variant bg-surface-container-high p-4 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
            Total
          </p>
          <strong className="mt-2 block text-lg font-medium tracking-[-0.03em] text-text">
            {formatCurrency(
              transactions.reduce((sum, item) => sum + (item.kind === 'income' ? item.amount : -item.amount), 0),
            )}
          </strong>
        </article>

        <article className="rounded-[1.5rem] border border-outline-variant bg-surface-container-high p-4 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
            Receitas
          </p>
          <strong className="mt-2 block text-lg font-medium tracking-[-0.03em] text-brand-900">
            {incomeCount}
          </strong>
        </article>

        <article className="rounded-[1.5rem] border border-outline-variant bg-surface-container-high p-4 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
            Despesas
          </p>
          <strong className="mt-2 block text-lg font-medium tracking-[-0.03em] text-error-900">
            {expenseCount}
          </strong>
        </article>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
          Buscar
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Titulo, categoria..."
          className="h-12 rounded-[1.1rem] border border-outline-variant bg-surface-container px-4 text-sm text-text outline-none ring-0 placeholder:text-text-variant focus:border-brand-400"
        />
      </label>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterOptions.map((option) => {
          const active = filter === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={[
                'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-brand-50 text-brand-900'
                  : 'bg-surface-container text-text-variant ring-1 ring-outline-variant',
              ].join(' ')}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-2">
        {filteredTransactions.length === 0 ? (
          <div className="rounded-[1.5rem] border border-outline-variant bg-surface-container p-6 text-center shadow-soft">
            <p className="mb-1 text-sm font-medium text-text">Nenhum movimento encontrado</p>
            <p className="m-0 text-sm text-text-variant">
              Tente ajustar a busca ou o filtro para ver os registros.
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              title={transaction.title}
              category={transaction.category}
              amount={formatCurrency(transaction.amount)}
              kind={transaction.kind}
              date={transaction.date}
              onDelete={() => onDelete(transaction.id)}
            />
          ))
        )}
      </div>
    </section>
  )
}
