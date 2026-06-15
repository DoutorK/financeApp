import { useEffect, useMemo, useState } from 'react'
import {
  filterTransactionsByPeriod,
  getPeriodLabel,
  loadTransactionsFromStorage,
  saveTransactionsToStorage,
  sortTransactionsDesc,
  type Transaction,
  type TransactionPeriod,
} from '../lib/transactions'

export type TransactionSummary = {
  income: number
  expense: number
  balance: number
  incomeShare: number
  expenseShare: number
}

export function useTransactionsStore(period: TransactionPeriod) {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    sortTransactionsDesc(loadTransactionsFromStorage()),
  )

  useEffect(() => {
    saveTransactionsToStorage(transactions)
  }, [transactions])

  const periodTransactions = useMemo(
    () => sortTransactionsDesc(filterTransactionsByPeriod(transactions, period)),
    [transactions, period],
  )

  const summary = useMemo<TransactionSummary>(() => {
    const income = periodTransactions
      .filter((transaction) => transaction.kind === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
    const expense = periodTransactions
      .filter((transaction) => transaction.kind === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
    const balance = income - expense
    const total = income + expense || 1
    const incomeShare = Math.round((income / total) * 100)

    return {
      income,
      expense,
      balance,
      incomeShare,
      expenseShare: 100 - incomeShare,
    }
  }, [periodTransactions])

  const recentTransactions = periodTransactions.slice(0, 3)
  const periodLabel = getPeriodLabel(period)

  function deleteTransaction(id: string) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  function createTransaction(transaction: Transaction) {
    setTransactions((current) => sortTransactionsDesc([transaction, ...current]))
  }

  return {
    transactions,
    setTransactions,
    periodTransactions,
    recentTransactions,
    periodLabel,
    summary,
    createTransaction,
    deleteTransaction,
  }
}
