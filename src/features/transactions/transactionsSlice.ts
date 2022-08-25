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

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    transactionAdded(state, action: PayloadAction<ITransaction>) {
      state.transactions.push(action.payload)
      switch (action.payload.type) {
        case 'consumption':
          state.cash -= action.payload.cash
          break
        case 'income':
          state.cash += action.payload.cash
      }
    },
    transactionChanged(state, action: PayloadAction<ITransaction>) {
      state.transactions = state.transactions.map(transaction => {
        if (action.payload.id === transaction.id) {
          state.cash += transaction.cash
          return action.payload
        }
        return transaction
      })
    },
    transactionDeleted(state, action: PayloadAction<number>) {
      state.transactions = state.transactions
        .filter(transaction => transaction.id !== action.payload)
    }
  }
})

export const {transactionAdded, transactionChanged, transactionDeleted} = transactionsSlice.actions