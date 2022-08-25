import { ITransaction } from '../../models/ITransaction'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITransactionsSlice {
  transactions: ITransaction[]
}

const initialState: ITransactionsSlice = {
  transactions: []
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    transactionAdded(state, action: PayloadAction<ITransaction>) {
      state.transactions.push(action.payload)
    },
    transactionChanged(state, action: PayloadAction<ITransaction>) {
      state.transactions = state.transactions.map(transaction => {
        if (action.payload.id === transaction.id) {
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