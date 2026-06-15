import { BalanceCard } from './components/BalanceCard'
import { BottomNav } from './components/BottomNav'
import { FabButton } from './components/FabButton'
import { MetricCard } from './components/MetricCard'
import { MovementsScreen } from './components/MovementsScreen'
import { TransactionCardPreview } from './components/TransactionCardPreview'
import { TransactionModal } from './components/TransactionModal'
import { formatCurrency, formatShortDate, type TransactionPeriod } from './lib/transactions'
import { getLocalDateInputValue } from './lib/date'
import { useDashboardState } from './hooks/useDashboardState'
import { useTransactionsStore } from './hooks/useTransactionsStore'

const chips: Array<{ label: string; value: TransactionPeriod }> = [
  { label: 'Semana', value: 'week' },
  { label: 'Mês', value: 'month' },
  { label: 'Ano', value: 'year' },
]

const navItems = [
  { label: 'Movimentos', icon: '◌' },
  { label: 'Início', icon: '⌂' },
  { label: 'Perfil', icon: '◔' },
] as const

export default function App() {
  const {
    activeScreen,
    setActiveScreen,
    period,
    setPeriod,
    movementQuery,
    setMovementQuery,
    movementFilter,
    setMovementFilter,
    composerOpen,
    openComposer,
    closeComposer,
  } = useDashboardState()

  const {
    periodTransactions,
    recentTransactions,
    periodLabel,
    summary,
    createTransaction,
    deleteTransaction,
  } = useTransactionsStore(period)

  return (
    <div className="relative min-h-svh overflow-hidden bg-surface px-4 pb-32 pt-4 text-text">
      <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-72 w-72 -translate-x-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 top-[16rem] h-56 w-56 rounded-full bg-brand-400/8 blur-3xl" />

      <header className="relative z-10 mx-auto flex max-w-md items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-text-variant">
            Hoje, {formatShortDate(getLocalDateInputValue())}
          </p>
          <h1 className="m-0 text-[1.7rem] font-normal tracking-[-0.03em] text-text">
            Carteira
          </h1>
        </div>

        <button
          type="button"
          aria-label="Abrir perfil"
          className="grid h-12 w-12 place-items-center rounded-full bg-surface-container shadow-soft ring-1 ring-outline-variant"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-900">
            FA
          </span>
        </button>
      </header>

      <main className="relative z-10 mx-auto mt-4 grid max-w-md gap-4">
        {activeScreen === 'Início' ? (
          <>
            <BalanceCard
              value={formatCurrency(summary.balance)}
              balanceAmount={summary.balance}
              expenseAmount={summary.expense}
            />

            <section className="flex gap-2 overflow-x-auto pb-1">
              {chips.map((chip) => {
                const active = period === chip.value

                return (
                  <button
                    key={chip.value}
                    type="button"
                    onClick={() => setPeriod(chip.value)}
                    className={[
                      'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-brand-50 text-brand-900'
                        : 'bg-surface-container text-text-variant ring-1 ring-outline-variant',
                    ].join(' ')}
                  >
                    {chip.label}
                  </button>
                )
              })}
            </section>

            <section className="grid gap-3 sm:grid-cols-3">
              <MetricCard label="Saldo" value={formatCurrency(summary.balance)} tone="balance" />
              <MetricCard label="Receitas" value={formatCurrency(summary.income)} tone="income" />
              <MetricCard label="Despesas" value={formatCurrency(summary.expense)} tone="expense" />
            </section>

            <section className="grid gap-3">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h2 className="m-0 text-sm font-medium tracking-[-0.01em] text-text">
                    Movimentos recentes
                  </h2>
                  <p className="m-0 text-xs text-text-variant">{periodLabel}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveScreen('Movimentos')}
                  className="text-xs font-medium text-brand-900"
                >
                  Ver todos
                </button>
              </div>

              {recentTransactions.length === 0 ? (
                <div className="rounded-[1.25rem] border border-outline-variant bg-surface-container p-4 text-sm text-text-variant shadow-soft">
                  Nenhum lançamento neste período. Toque em + para criar o primeiro.
                </div>
              ) : (
                <div className="grid gap-2">
                  {recentTransactions.map((transaction) => (
                    <TransactionCardPreview
                      key={transaction.id}
                      title={transaction.title}
                      category={transaction.category}
                      amount={formatCurrency(transaction.amount)}
                      kind={transaction.kind}
                      dateLabel={formatShortDate(transaction.date)}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        ) : null}

        {activeScreen === 'Movimentos' ? (
          <MovementsScreen
            transactions={periodTransactions}
            query={movementQuery}
            filter={movementFilter}
            onQueryChange={setMovementQuery}
            onFilterChange={setMovementFilter}
            onDelete={deleteTransaction}
          />
        ) : null}

        {activeScreen === 'Perfil' ? (
          <section className="rounded-[1.5rem] border border-outline-variant bg-surface-container p-5 shadow-soft">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-text-variant">
              Perfil
            </p>
            <h2 className="m-0 text-lg font-medium tracking-[-0.02em] text-text">
              Em breve
            </h2>
            <p className="mt-2 text-sm text-text-variant">
              Mantive esta tela simples por enquanto para não expandir a base antes da hora.
            </p>
          </section>
        ) : null}
      </main>

      <FabButton label="Adicionar lançamento" onClick={openComposer} />
      <BottomNav
        items={navItems}
        activeLabel={activeScreen}
        onChange={(label) => setActiveScreen(label as 'Início' | 'Movimentos' | 'Perfil')}
      />

      <TransactionModal
        open={composerOpen}
        onClose={closeComposer}
        onCreate={(transaction) => {
          createTransaction(transaction)
          setActiveScreen('Movimentos')
        }}
      />
    </div>
  )
}
