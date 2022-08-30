import classes from './TransactionList.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { StatusFilter } from '../../features/filters/filtersSlice'
import ModalChange from '../modals/ModalChange/ModalChange'
import { useState } from 'react'
import Button from '../UI/Button/Button'
import { transactionDeleted } from '../../features/transactions/transactionsSlice'

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
  const dispatch = useAppDispatch()

  const typeList = {
    income: 'доход',
    consumption: 'расход'
  }

  return (
    <section className={classes.Transactions}>
      <table className={classes.Table}>
        <thead>
        <tr>
          <th></th>
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
            <td>
              <button
                title="Удалить операцию"
                className={classes.Delete}
                onClick={() => dispatch(transactionDeleted(transaction.id))}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1C15.1333 15.4 18.6667 19 18.6667 19" stroke="#777777" strokeWidth="2"/>
                  <path d="M19 1C4.86667 15.4 1.33333 19 1.33333 19" stroke="#777777" strokeWidth="2"/>
                </svg>
              </button>
            </td>
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