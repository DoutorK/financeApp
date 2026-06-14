import { BalanceCard } from './components/BalanceCard'
import { BottomNav } from './components/BottomNav'
import { FabButton } from './components/FabButton'
import { MetricCard } from './components/MetricCard'
import { TransactionItem } from './components/TransactionItem'

const metrics = [
  { label: 'Saldo', value: 8450.9, tone: 'balance' },
  { label: 'Receitas', value: 12480.5, tone: 'income' },
  { label: 'Despesas', value: 4029.6, tone: 'expense' },
] as const

const transactions = [
  { title: 'Salário mensal', category: 'Salário', amount: 9800, kind: 'income', date: '13 jun' },
  { title: 'Mercado', category: 'Alimentação', amount: 184.7, kind: 'expense', date: '12 jun' },
  { title: 'Gasolina', category: 'Transporte', amount: 128.9, kind: 'expense', date: '11 jun' },
] as const

const chips = ['Semana', 'Mês', 'Ano'] as const

const navItems = [
  { label: 'Início', icon: '⌂', active: true },
  { label: 'Movimentos', icon: '◌', active: false },
  { label: 'Perfil', icon: '◔', active: false },
] as const

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function App() {
  const income = metrics[1].value
  const expense = metrics[2].value
  const total = income + expense
  const incomeShare = Math.round((income / total) * 100)
  const expenseShare = 100 - incomeShare

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
        <BalanceCard
          value={formatCurrency(metrics[0].value)}
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
          {metrics.map((item) => (
            <MetricCard
              key={item.label}
              label={item.label}
              value={formatCurrency(item.value)}
              tone={item.tone}
            />
          ))}
        </section>

        <section className="grid gap-3">
          <div className="flex items-end justify-between gap-3">
            <h2 className="m-0 text-sm font-medium tracking-[-0.01em] text-text">
              Movimentos recentes
            </h2>
            <span className="text-xs text-text-variant">3 registros</span>
          </div>

          <div className="grid gap-2">
            {transactions.map((item) => (
              <TransactionItem
                key={`${item.title}-${item.date}`}
                title={item.title}
                category={item.category}
                amount={formatCurrency(item.amount)}
                kind={item.kind}
                date={item.date}
              />
            ))}
          </div>
        </section>
      </main>

      <FabButton label="Adicionar lançamento" />
      <BottomNav items={navItems} />
    </div>
  )
}
