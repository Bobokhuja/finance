import classes from './TransactionList.module.scss'
import { useAppSelector } from '../../app/hooks'
import { StatusFilter } from '../../features/filters/filtersSlice'
import ModalChange from '../modals/ModalChange/ModalChange'
import { useState } from 'react'
import Button from '../UI/Button/Button'

function TransactionList() {
  const {status, search} = useAppSelector(state => state.filters)
  const transactions = useAppSelector(state => {
    switch (status) {
      case StatusFilter.All: {
        if (search === '') {
          return state.transactions.transactions
        } else {
          return state.transactions.transactions
            .filter(transaction => (transaction.name.indexOf(search) !== -1) ||
              transaction.cash.toString().startsWith(search))
        }
      }
      case StatusFilter.Income:
        if (search === '') {
          return state.transactions.transactions.filter(transaction =>
            transaction.type === StatusFilter.Income)
        } else {
          return state.transactions.transactions.filter(transaction =>
            transaction.type === StatusFilter.Income &&
            (transaction.name.indexOf(search) !== -1) || transaction.cash.toString().startsWith(search))
        }
      case StatusFilter.Consumption:
        if (search === '') {
          return state.transactions.transactions.filter(transaction =>
            transaction.type === StatusFilter.Consumption)
        } else {
          return state.transactions.transactions.filter(transaction =>
            transaction.type === StatusFilter.Consumption &&
            (transaction.name.indexOf(search) !== -1) || transaction.cash.toString().startsWith(search))
        }
      default:
        return state.transactions.transactions
    }
  })
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false)
  const [isActiveId, setIsActiveId] = useState<number>()

  const typeList = {
    income: 'доход',
    consumption: 'расход'
  }

  return (
    <section className={classes.Transactions}>
      <table className={classes.Table}>
        <thead>
        <tr>
          <th>Тип операции</th>
          <th>Сумма</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Дата транзакции</th>
        </tr>
        </thead>
        <tbody>
        {transactions.map(transaction =>
          <tr key={transaction.id} className={`${transaction.type === 'income' ? classes.IncomeType : ''}`}>
            <td>{typeList[transaction.type]}</td>
            <td>{transaction.cash}</td>
            <td>{transaction.name}</td>
            <td>{transaction.description}</td>
            <td>{new Date(transaction.date).toLocaleString()}</td>
            <td>
              <Button
                onClick={() => {
                setIsActiveModal(true)
                setIsActiveId(transaction.id)
              }}>изменить
              </Button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
      <ModalChange isShow={isActiveModal} onHide={() => setIsActiveModal(false)} transactionId={isActiveId}/>
    </section>
  )
}

export default TransactionList