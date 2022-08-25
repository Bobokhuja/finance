export interface ITransaction {
  id: number
  type: 'consumption' | 'income'
  cash: number
  date: number
}