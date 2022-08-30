import { ITransaction } from '../../models/ITransaction'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITransactionsSlice {
  transactions: ITransaction[]
  cash: number
}

const initialState: ITransactionsSlice = {
  transactions: [],
  cash: 0
}

const getSum = (transactions: ITransaction[]): number => {
  return transactions.reduce((sum: number, item) => {
    switch (item.type) {
      case 'income':
        return sum + item.cash
      case 'consumption':
        return sum - item.cash
    }
  }, initialState.cash)
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    transactionAdded(state, action: PayloadAction<ITransaction>) {
      state.transactions.push(action.payload)
      state.cash = getSum(state.transactions)
    },
    transactionChanged(state, action: PayloadAction<ITransaction>) {
      state.transactions = state.transactions.map(transaction => {
        if (action.payload.id === transaction.id) {
          return action.payload
        }
        return transaction
      })
      state.cash = getSum(state.transactions)
    },
    transactionDeleted(state, action: PayloadAction<number>) {
      state.transactions = state.transactions
        .filter(transaction => transaction.id !== action.payload)
      state.cash = getSum(state.transactions)
    }
  },
})

export const {transactionAdded, transactionChanged, transactionDeleted} = transactionsSlice.actions