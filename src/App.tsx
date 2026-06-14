import { useState } from 'react'
import { BalanceCard } from './components/BalanceCard'
import { BottomNav } from './components/BottomNav'
import { FabButton } from './components/FabButton'
import { MetricCard } from './components/MetricCard'
import { MovementsScreen, type MovementFilter, type MovementTransaction } from './components/MovementsScreen'

type Screen = 'Movimentos' | 'Início' | 'Perfil'

const chips = ['Semana', 'Mês', 'Ano'] as const

const initialTransactions: MovementTransaction[] = [
  { id: 'tx-1', title: 'Salário mensal', category: 'Salário', amount: 9800, kind: 'income', date: '13 jun' },
]

const navItems = [
  { label: 'Movimentos', icon: '◌' },
  { label: 'Início', icon: '⌂' },
  { label: 'Perfil', icon: '◔' },
] as const

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('Início')
  const [movementQuery, setMovementQuery] = useState('')
  const [movementFilter, setMovementFilter] = useState<MovementFilter>('all')
  const [transactions, setTransactions] = useState<MovementTransaction[]>(initialTransactions)

  const income = transactions
    .filter((transaction) => transaction.kind === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  const expense = transactions
    .filter((transaction) => transaction.kind === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  const balance = income - expense
  const total = income + expense || 1
  const incomeShare = Math.round((income / total) * 100)
  const expenseShare = 100 - incomeShare

  function handleDeleteTransaction(id: string) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  function handleFabClick() {
    setActiveScreen('Movimentos')
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-surface px-4 pb-32 pt-4 text-text">
      <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-72 w-72 -translate-x-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 top-[16rem] h-56 w-56 rounded-full bg-brand-400/8 blur-3xl" />

      <header className="relative z-10 mx-auto flex max-w-md items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-text-variant">
            Hoje, 13 de junho
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
            MJ
          </span>
        </button>
      </header>

      <main className="relative z-10 mx-auto mt-4 grid max-w-md gap-4">
        {activeScreen === 'Início' ? (
          <>
            <BalanceCard
              value={formatCurrency(balance)}
              incomeShare={incomeShare}
              expenseShare={expenseShare}
            />

            <section className="flex gap-2">
              {chips.map((chip, index) => (
                <button
                  key={chip}
                  type="button"
                  className={[
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    index === 0
                      ? 'bg-brand-50 text-brand-900'
                      : 'bg-surface-container text-text-variant ring-1 ring-outline-variant',
                  ].join(' ')}
                >
                  {chip}
                </button>
              ))}
            </section>

            <section className="grid gap-3 sm:grid-cols-3">
              <MetricCard label="Saldo" value={formatCurrency(balance)} tone="balance" />
              <MetricCard label="Receitas" value={formatCurrency(income)} tone="income" />
              <MetricCard label="Despesas" value={formatCurrency(expense)} tone="expense" />
            </section>

            <section className="grid gap-3">
              <div className="flex items-end justify-between gap-3">
                <h2 className="m-0 text-sm font-medium tracking-[-0.01em] text-text">
                  Movimentos recentes
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveScreen('Movimentos')}
                  className="text-xs font-medium text-brand-900"
                >
                  Ver todos
                </button>
              </div>

              <div className="rounded-[1.25rem] border border-outline-variant bg-surface-container p-4 text-sm text-text-variant shadow-soft">
                Toque em Movimentos para pesquisar, filtrar e remover lançamentos.
              </div>
            </section>
          </>
        ) : null}

        {activeScreen === 'Movimentos' ? (
          <MovementsScreen
            transactions={transactions}
            query={movementQuery}
            filter={movementFilter}
            onQueryChange={setMovementQuery}
            onFilterChange={setMovementFilter}
            onDelete={handleDeleteTransaction}
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

      <FabButton label="Adicionar lancamento" onClick={handleFabClick} />
      <BottomNav
        items={navItems}
        activeLabel={activeScreen}
        onChange={(label) => setActiveScreen(label as Screen)}
      />
    </div>
  )
}
