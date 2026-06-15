import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from 'react'
import {
  generateTransactionId,
  type Transaction,
  type TransactionKind,
} from '../lib/transactions'
import { getLocalDateInputValue } from '../lib/date'

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
  date: getLocalDateInputValue(),
})

const categoryOptions = ['Salário', 'Freelance', 'Alimentação', 'Transporte', 'Moradia', 'Outros']
const CLOSE_THRESHOLD = 120
const CLOSE_ANIMATION_MS = 220

export function TransactionModal({ open, onClose, onCreate }: TransactionModalProps) {
  const [form, setForm] = useState<FormState>(initialState)
  const [presented, setPresented] = useState(open)
  const [closing, setClosing] = useState(false)
  const [entered, setEntered] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const pointerStartY = useRef<number | null>(null)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    if (open) {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current)
        closeTimer.current = null
      }
      setPresented(true)
      setClosing(false)
      setEntered(false)
      setDragOffset(0)
      setIsDragging(false)
      setForm(initialState())
      window.requestAnimationFrame(() => setEntered(true))
      return
    }

    if (presented) {
      setClosing(true)
      setEntered(true)
      setDragOffset(0)
      closeTimer.current = window.setTimeout(() => {
        setPresented(false)
        setClosing(false)
        setEntered(false)
      }, CLOSE_ANIMATION_MS)
    }
  }, [open, presented])

  useEffect(() => {
    if (!presented) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [presented])

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current)
    }
  }, [])

  if (!presented) return null

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function requestClose() {
    if (closing) return
    setClosing(true)
    setEntered(true)
    setIsDragging(false)
    setDragOffset(0)
    closeTimer.current = window.setTimeout(() => {
      setPresented(false)
      setClosing(false)
      setEntered(false)
      onClose()
    }, CLOSE_ANIMATION_MS)
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
    requestClose()
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    pointerStartY.current = event.clientY
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!isDragging || pointerStartY.current === null) return

    const deltaY = Math.max(0, event.clientY - pointerStartY.current)
    setDragOffset(deltaY)
  }

  function handlePointerUp() {
    if (!isDragging) return

    const shouldClose = dragOffset > CLOSE_THRESHOLD
    pointerStartY.current = null
    setIsDragging(false)

    if (shouldClose) {
      requestClose()
      return
    }

    setDragOffset(0)
  }

  const panelTransform = closing
    ? 'translateY(100%) scale(0.98)'
    : !entered
      ? 'translateY(100%) scale(0.98)'
      : `translateY(${dragOffset}px) scale(1)`
  const overlayOpacity = closing
    ? 0
    : !entered
      ? 0
      : dragOffset > 0
        ? Math.max(0.2, 1 - dragOffset / 500)
        : 1

  return (
    <div className="fixed inset-0 z-30">
      <button
        type="button"
        aria-label="Fechar formulário"
        className="absolute inset-0 cursor-default bg-text/35 transition-opacity duration-200"
        style={{ opacity: overlayOpacity }}
        onClick={requestClose}
      />

      <div
        className="absolute inset-x-0 bottom-0 max-h-[92svh] overflow-y-auto overscroll-contain rounded-t-[1.75rem] border border-outline-variant bg-surface-container p-5 shadow-elevated will-change-transform transition-[transform,opacity] duration-300 ease-out"
        style={{ transform: panelTransform, opacity: overlayOpacity === 0 && !closing ? 0 : 1 }}
      >
        <button
          type="button"
          aria-label="Arrastar para fechar"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="mx-auto mb-4 block h-8 w-full touch-none overscroll-contain rounded-full"
        >
          <div className="mx-auto h-1.5 w-12 rounded-full bg-outline-variant" />
        </button>

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
            onClick={requestClose}
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
              onClick={requestClose}
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
