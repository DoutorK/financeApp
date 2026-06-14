type TransactionKind = 'income' | 'expense'

type TransactionItemProps = {
  title: string
  category: string
  amount: string
  kind: TransactionKind
  dateLabel: string
  onDelete?: () => void
}

const kindClass: Record<TransactionKind, string> = {
  income: 'bg-brand-50 text-brand-900',
  expense: 'bg-error-50 text-error-900',
}

const amountClass: Record<TransactionKind, string> = {
  income: 'text-brand-900',
  expense: 'text-error-900',
}

export function TransactionItem({
  title,
  category,
  amount,
  kind,
  dateLabel,
  onDelete,
}: TransactionItemProps) {
  return (
    <article
      className={[
        'grid items-center gap-3 rounded-[1.25rem] border border-outline-variant bg-surface-container p-4 shadow-soft',
        onDelete ? 'grid-cols-[auto_1fr_auto_auto]' : 'grid-cols-[auto_1fr_auto]',
      ].join(' ')}
    >
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

      {onDelete ? (
        <button
          type="button"
          aria-label={`Remover ${title}`}
          onClick={onDelete}
          className="ml-1 grid h-8 w-8 place-items-center rounded-full text-text-variant transition-colors hover:bg-error-50 hover:text-error-900"
        >
          ×
        </button>
      ) : null}
    </article>
  )
}
