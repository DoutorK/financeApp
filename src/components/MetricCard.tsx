type MetricTone = 'balance' | 'income' | 'expense'

type MetricCardProps = {
  label: string
  value: string
  tone: MetricTone
}

const toneClass: Record<MetricTone, string> = {
  balance: 'border-outline-variant bg-surface-container-high text-text',
  income: 'border-outline-variant bg-surface-container-high text-text',
  expense: 'border-error-50 bg-error-50/60 text-error-900',
}

export function MetricCard({ label, value, tone }: MetricCardProps) {
  return (
    <article className={`rounded-[1.5rem] border p-4 shadow-soft ${toneClass[tone]}`}>
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
        {label}
      </p>
      <strong className="mt-2 block text-lg font-medium tracking-[-0.03em] text-inherit">
        {value}
      </strong>
    </article>
  )
}
