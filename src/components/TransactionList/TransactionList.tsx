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
          return state.
          transactions.transactions
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

  return (
    <ul className={classes.List}>
      {transactions.map(transaction =>
        <TransactionItem
          key={transaction.id}
          id={transaction.id}
          name={transaction.name}
          description={transaction.description}
          type={transaction.type}
          cash={transaction.cash}
          date={transaction.date}
        />
      )}
    </ul>
  )
}

export default TransactionList