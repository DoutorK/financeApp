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
          <p className="mb-1 text-[0.72rem] font-medium tracking-[0.14em] text-text-variant uppercase">
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
        <section className="rounded-[1.75rem] border border-outline-variant bg-surface-container p-5 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-medium tracking-[0.12em] text-text-variant uppercase">
                Saldo disponível
              </p>
              <strong className="block text-[clamp(2.4rem,10vw,3.6rem)] font-normal tracking-[-0.04em] text-text">
                {formatCurrency(metrics[0].value)}
              </strong>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-900">
              Estável
            </span>
          </div>

          <div className="mt-5">
            <div className="flex h-3 overflow-hidden rounded-full bg-outline-variant">
              <span
                className="block h-full bg-brand-400"
                style={{ width: `${incomeShare}%` }}
              />
              <span
                className="block h-full bg-error-400"
                style={{ width: `${expenseShare}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between gap-3 text-xs text-text-variant">
              <span>Entradas {incomeShare}%</span>
              <span>Saídas {expenseShare}%</span>
            </div>
          </div>
        </section>

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
            <article
              key={item.label}
              className={[
                'rounded-[1.5rem] border p-4 shadow-soft',
                item.tone === 'expense'
                  ? 'border-error-50 bg-error-50/60'
                  : 'border-outline-variant bg-surface-container-high',
              ].join(' ')}
            >
              <p className="text-xs font-medium tracking-[0.08em] text-text-variant uppercase">
                {item.label}
              </p>
              <strong
                className={[
                  'mt-2 block text-lg font-medium tracking-[-0.03em]',
                  item.tone === 'expense' ? 'text-error-900' : 'text-text',
                ].join(' ')}
              >
                {formatCurrency(item.value)}
              </strong>
            </article>
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
              <article
                key={`${item.title}-${item.date}`}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[1.25rem] border border-outline-variant bg-surface-container p-4 shadow-soft"
              >
                <div
                  className={[
                    'grid h-11 w-11 place-items-center rounded-[1rem] text-sm font-medium',
                    item.kind === 'income'
                      ? 'bg-brand-50 text-brand-900'
                      : 'bg-error-50 text-error-900',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {item.kind === 'income' ? '↗' : '↘'}
                </div>

                <div className="min-w-0">
                  <strong className="mb-1 block truncate text-sm font-medium text-text">
                    {item.title}
                  </strong>
                  <p className="m-0 flex items-center gap-1.5 text-[0.8rem] text-text-variant">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </p>
                </div>

                <div
                  className={[
                    'whitespace-nowrap text-sm font-medium tracking-[-0.02em]',
                    item.kind === 'income' ? 'text-brand-900' : 'text-error-900',
                  ].join(' ')}
                >
                  {item.kind === 'income' ? '+' : '-'}
                  {formatCurrency(item.amount)}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <button
        type="button"
        aria-label="Adicionar lançamento"
        className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-20 grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-3xl text-white shadow-fab-lg"
      >
        +
      </button>

      <nav
        aria-label="Navegação principal"
        className="fixed bottom-3 left-3 right-3 z-10 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-outline-variant bg-surface-container/95 p-2 shadow-elevated backdrop-blur-xl"
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-current={item.active ? 'page' : undefined}
            className={[
              'flex flex-col items-center justify-center gap-1 rounded-[1.1rem] px-2 py-2 text-[0.72rem] font-medium transition-colors',
              item.active ? 'bg-brand-50 text-brand-900' : 'text-text-variant',
            ].join(' ')}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}