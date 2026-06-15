import { useState } from 'react'
import type { TransactionFilter, TransactionPeriod } from '../lib/transactions'

export type Screen = 'Início' | 'Movimentos' | 'Perfil'

export function useDashboardState() {
  const [activeScreen, setActiveScreen] = useState<Screen>('Início')
  const [period, setPeriod] = useState<TransactionPeriod>('month')
  const [movementQuery, setMovementQuery] = useState('')
  const [movementFilter, setMovementFilter] = useState<TransactionFilter>('all')
  const [composerOpen, setComposerOpen] = useState(false)

  function openComposer() {
    setComposerOpen(true)
  }

  function closeComposer() {
    setComposerOpen(false)
  }

  return {
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
  }
}
