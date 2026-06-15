type BalanceCardProps = {
  value: string
  balanceAmount: number
  expenseAmount: number
}

export function BalanceCard({ value, balanceAmount, expenseAmount }: BalanceCardProps) {
  const total = balanceAmount + expenseAmount
  const remainingShare =
    total <= 0 ? 0 : Math.round((Math.max(balanceAmount, 0) / total) * 100)
  const expenseShare = total <= 0 ? 100 : 100 - remainingShare

  return (
    <section className="rounded-[1.75rem] border border-outline-variant bg-surface-container p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-text-variant">
            Saldo disponível
          </p>
          <strong className="block text-[clamp(2.4rem,10vw,3.6rem)] font-normal tracking-[-0.04em] text-text">
            {value}
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
            style={{ flexGrow: Math.max(balanceAmount, 0), flexBasis: 0 }}
          />
          <span
            className="block h-full bg-error-400"
            style={{ flexGrow: expenseAmount, flexBasis: 0 }}
          />
        </div>

        <div className="mt-2 flex justify-between gap-3 text-xs text-text-variant">
          <span>Saldo restante {remainingShare}%</span>
          <span>Saídas {expenseShare}%</span>
        </div>
      </div>
    </section>
  )
}
