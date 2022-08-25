import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type statusType = 'all' | 'income' | 'consumption'

interface IFiltersSlice {
  status: statusType
  search: string
}

export const StatusFilter = {
  All: 'all',
  Income: 'income',
  Consumption: 'consumption'
}

const initialState: IFiltersSlice = {
  status: 'all',
  search: ''
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeStatus(state, action: PayloadAction<statusType>) {
      state.status = action.payload
    },
    searchTodo(state, action: PayloadAction<string>) {
      state.search = action.payload
    }
  }
})

export const {searchTodo, changeStatus} = filtersSlice.actions