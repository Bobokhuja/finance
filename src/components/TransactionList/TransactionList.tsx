import classes from './TransactionList.module.scss'
import TransactionItem from './TransactionItem/TransactionItem'
import { useAppSelector } from '../../app/hooks'
import { StatusFilter } from '../../features/filters/filtersSlice'

function TransactionList() {
  const {status, search} = useAppSelector(state => state.filters)
  const transactions = useAppSelector(state => {
    switch (status) {
      case StatusFilter.All: {
        if (search === '') {
          return state.transactions.transactions
        } else {
          return state.transactions.transactions
            .filter(transaction => transaction.name.startsWith(search) || transaction.cash.toString().startsWith(search))
        }
      }
      case StatusFilter.Income:
        return state.transactions.transactions.filter(transaction => transaction.type === StatusFilter.Income)
      case StatusFilter.Consumption:
        return state.transactions.transactions.filter(transaction => transaction.type === StatusFilter.Consumption)
      default:
        return state.transactions.transactions
    }
  })

  const typeList = {
    income: 'доход',
    consumption: 'расход'
  }

  return (
    <section className={classes.Transactions}>
      <table className={classes.Table}>
        <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Тип операции</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Дата транзакции</th>
        </tr>
        </thead>
        <tbody>
        {transactions.map(transaction =>
          <tr key={transaction.id} className={`${transaction.type === 'income' ? classes.IncomeType : ''}`}>
            <td>{transaction.id}</td>
            <td>{transaction.cash}</td>
            <td>{typeList[transaction.type]}</td>
            <td>{transaction.name}</td>
            <td>{transaction.description}</td>
            <td>{new Date(transaction.date).toLocaleString()}</td>
          </tr>
        )}
        </tbody>
      </table>
    </section>
  )
}

export default TransactionList