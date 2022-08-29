import classes from './TransactionItem.module.scss'
import { useState } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { ITransaction } from '../../../models/ITransaction'
import { transactionDeleted } from '../../../features/transactions/transactionsSlice'


function TransactionItem({id, cash, date, type, name, description}: ITransaction) {
  const [isShow, setIsShow] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  return (
    <li className={classes.Item}>
      <header className={classes.Header}>
        <p className={`${classes.Cash} ${type === 'consumption' ? classes.Consumption : classes.Income}`}>{cash}</p>
        <p
          className={classes.Name}
        >{name}</p>
        <time className={classes.Time} dateTime={date.toString()}>{new Date(date).toLocaleString()}</time>

        <div className={classes.Right}>
          <button
            title="Удалить операцию"
            className={classes.Delete}
            onClick={() => dispatch(transactionDeleted(id))}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1C15.1333 15.4 18.6667 19 18.6667 19" stroke="#777777" strokeWidth="2"/>
              <path d="M19 1C4.86667 15.4 1.33333 19 1.33333 19" stroke="#777777" strokeWidth="2"/>
            </svg>
          </button>

          {description && (
            <button
              title="Описание транзакции"
              className={`${classes.More} ${isShow ? classes.Active : ''}`}
              onClick={() => setIsShow(prevState => !prevState)}
            >
              <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L9 9L17 1" stroke="#555555" strokeWidth="2"/>
              </svg>
            </button>
          )}
        </div>
      </header>
      {isShow && description && <div className={classes.Description}>{description}</div>}
    </li>
  )
}

export default TransactionItem