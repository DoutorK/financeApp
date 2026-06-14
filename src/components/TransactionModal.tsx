import { useEffect, useState, type FormEvent } from 'react'
import { generateTransactionId, type Transaction, type TransactionKind } from '../lib/transactions'

type TransactionModalProps = {
  open: boolean
  onClose: () => void
  onCreate: (transaction: Transaction) => void
}

type FormState = {
  title: string
  category: string
  amount: string
  kind: TransactionKind
  date: string
}

const initialState = (): FormState => ({
  title: '',
  category: 'Outros',
  amount: '',
  kind: 'expense',
  date: new Date().toISOString().slice(0, 10),
})

const categoryOptions = ['Salário', 'Freelance', 'Alimentação', 'Transporte', 'Moradia', 'Outros']

export function TransactionModal({ open, onClose, onCreate }: TransactionModalProps) {
  const [form, setForm] = useState<FormState>(initialState)

  useEffect(() => {
    if (open) setForm(initialState())
  }, [open])

  if (!open) return null

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const amount = Number(form.amount)
    if (!form.title.trim() || !amount || amount <= 0) return

    onCreate({
      id: generateTransactionId(),
      title: form.title.trim(),
      category: form.category,
      amount,
      kind: form.kind,
      date: form.date,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-30">
      <button
        type="button"
        aria-label="Fechar formulário"
        className="absolute inset-0 cursor-default bg-text/35"
        onClick={onClose}
      />

      <div className="absolute inset-x-0 bottom-0 rounded-t-[1.75rem] border border-outline-variant bg-surface-container p-5 shadow-elevated">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-outline-variant" />

        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-text-variant">
              Novo lançamento
            </p>
            <h2 className="m-0 text-lg font-medium tracking-[-0.02em] text-text">
              Adicionar movimento
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-text-variant hover:bg-surface-container-high"
          >
            ×
          </button>
        </div>

        <form className="grid gap-3" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
              Título
            </span>
            <input
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="Ex.: Freelance landing page"
              className="h-12 rounded-[1.1rem] border border-outline-variant bg-surface px-4 text-sm text-text outline-none focus:border-brand-400"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
                Tipo
              </span>
              <select
                value={form.kind}
                onChange={(event) => updateField('kind', event.target.value as TransactionKind)}
                className="h-12 rounded-[1.1rem] border border-outline-variant bg-surface px-4 text-sm text-text outline-none focus:border-brand-400"
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
                Valor
              </span>
              <input
                value={form.amount}
                onChange={(event) => updateField('amount', event.target.value)}
                inputMode="decimal"
                placeholder="0,00"
                className="h-12 rounded-[1.1rem] border border-outline-variant bg-surface px-4 text-sm text-text outline-none focus:border-brand-400"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
                Categoria
              </span>
              <select
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
                className="h-12 rounded-[1.1rem] border border-outline-variant bg-surface px-4 text-sm text-text outline-none focus:border-brand-400"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-variant">
                Data
              </span>
              <input
                type="date"
                value={form.date}
                onChange={(event) => updateField('date', event.target.value)}
                className="h-12 rounded-[1.1rem] border border-outline-variant bg-surface px-4 text-sm text-text outline-none focus:border-brand-400"
              />
            </label>
          </div>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-outline-variant bg-surface-container px-4 py-3 text-sm font-medium text-text-variant"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-fab-lg"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
