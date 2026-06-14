type TransactionKind = 'income' | 'expense'

type TransactionCardPreviewProps = {
  title: string
  category: string
  amount: string
  kind: TransactionKind
  dateLabel: string
}

const kindClass: Record<TransactionKind, string> = {
  income: 'bg-brand-50 text-brand-900',
  expense: 'bg-error-50 text-error-900',
}

const amountClass: Record<TransactionKind, string> = {
  income: 'text-brand-900',
  expense: 'text-error-900',
}

export function TransactionCardPreview({
  title,
  category,
  amount,
  kind,
  dateLabel,
}: TransactionCardPreviewProps) {
  return (
    <article className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[1.25rem] border border-outline-variant bg-surface-container p-4 shadow-soft">
      <div
        className={`grid h-11 w-11 place-items-center rounded-[1rem] text-sm font-medium ${kindClass[kind]}`}
        aria-hidden="true"
      >
        {kind === 'income' ? '↗' : '↘'}
      </div>

      <div className="min-w-0">
        <strong className="mb-1 block truncate text-sm font-medium text-text">{title}</strong>
        <p className="m-0 flex items-center gap-1.5 text-[0.8rem] text-text-variant">
          <span>{category}</span>
          <span>•</span>
          <span>{dateLabel}</span>
        </p>
      </div>

      <div className={`whitespace-nowrap text-sm font-medium tracking-[-0.02em] ${amountClass[kind]}`}>
        {kind === 'income' ? '+' : '-'}
        {amount}
      </div>
    </article>
  )
}