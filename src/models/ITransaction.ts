export interface ITransaction {
  id: number
  name: string
  description: string
  type: 'consumption' | 'income'
  cash: number
  date: number
}