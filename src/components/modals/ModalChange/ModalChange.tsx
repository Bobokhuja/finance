import classes from './ModalChange.module.scss'
import Modal from '../Modal'
import Input from '../../UI/Input/Input'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { transactionAdded, transactionChanged } from '../../../features/transactions/transactionsSlice'
import { ITransaction } from '../../../models/ITransaction'
import Radio from '../../UI/Radio/Radio'
import { StatusFilter } from '../../../features/filters/filtersSlice'
import Button from '../../UI/Button/Button'
import Textarea from '../../UI/Textarea/Textarea'

const nextTodoId = (todos: ITransaction[]) => {
  console.log(todos)
  return todos.reduce((maxId: number, todo) =>
    Math.max(maxId, todo.id), 0) + 1
}

function ModalChange({onHide, isShow, transactionId}: { isShow: boolean, onHide: () => void, transactionId: number | undefined }) {
  const [name, setName] = useState<string>('')
  const [cash, setCash] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const {transactions} = useAppSelector(state => state.transactions)
  const [transactionType, setTransactionType] = useState<'income' | 'consumption'>('income')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (transactionId) {
      const transaction = transactions.find(transaction => transaction.id === transactionId)
      setName(transaction!.name)
      setDescription(transaction!.description)
      setCash(transaction!.cash)
      setTransactionType(transaction!.type)
    }
  }, [transactionId])

  if (!transactionId) {
    return null
  }

  const onChangeHandler = (event: any) => {
    event.preventDefault()

    if (name) {
      dispatch(transactionChanged({
        id: transactionId,
        name,
        description,
        type: transactionType,
        cash,
        date: Date.now()
      }))
      onHide()
    }

    // setName('')
    // setCash(0)
    // setDescription('')
    // setTransactionType('income')
  }

  return (
    <Modal isShow={isShow} onHide={onHide}>
      <h2 className={classes.Title}>Изменить операцию</h2>

      <form>
        <Input
          type="text"
          value={name}
          placeholder="Название Операции"
          onChange={event => setName(event.target.value)}
          className={classes.Input}
          required={true}
        />
        <Input
          type="number"
          value={cash.toString()}
          placeholder="Сумма операции"
          onChange={event => setCash(+event.target.value)}
          className={classes.Input}
          required={true}
        />

        <div className={classes.RadioButtons}>
          <Radio
            label="доход"
            name="typeTransaction"
            value={StatusFilter.Income}
            onChange={() => setTransactionType('income')}
            checked={StatusFilter.Income === transactionType}
          />
          <Radio
            label="расход"
            name="typeTransaction"
            value={StatusFilter.Consumption}
            onChange={() => setTransactionType('consumption')}
            checked={StatusFilter.Consumption === transactionType}
          />
        </div>

        <Textarea
          value={description}
          placeholder="Описание"
          onChange={event => setDescription(event.target.value)}
          className={classes.Textarea}
          required={false}
        />
        <Button
          type="submit"
          className={classes.Button}
          onClick={onChangeHandler}
        >Изменить</Button>
      </form>
    </Modal>
  )
}

export default ModalChange