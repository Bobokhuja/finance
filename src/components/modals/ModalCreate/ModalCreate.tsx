import classes from './ModalCreate.module.scss'
import Modal from '../Modal'
import Input from '../../UI/Input/Input'
import { useState } from 'react'
import Textarea from '../../UI/Textarea/Textarea'
import Button from '../../UI/Button/Button'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { transactionAdded } from '../../../features/transactions/transactionsSlice'
import { ITransaction } from '../../../models/ITransaction'
import Radio from '../../UI/Radio/Radio'
import { changeStatus, StatusFilter } from '../../../features/filters/filtersSlice'

const nextTodoId = (todos: ITransaction[]) => {
  console.log(todos)
  return todos.reduce((maxId: number, todo) =>
    Math.max(maxId, todo.id), 0) + 1
}

function ModalCreate({onHide, isShow}: { isShow: boolean, onHide: () => void }) {
  const [name, setName] = useState<string>('')
  const [cash, setCash] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const {transactions} = useAppSelector(state => state.transactions)
  const [transactionType, setTransactionType] = useState<'income' | 'consumption'>('income')
  const dispatch = useAppDispatch()

  const onCreateHandler = (event: any) => {
    event.preventDefault()

    if (name) {
      dispatch(transactionAdded({
        id: nextTodoId(transactions),
        type: 'income',
        cash,
        date: Date.now()
      }))
      onHide()
    }
  }

  return (
    <Modal isShow={isShow} onHide={onHide}>
      <h2 className={classes.Title}>Создать Todo</h2>

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

        <div>
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
          onClick={onCreateHandler}
        >Создать</Button>
      </form>
    </Modal>
  )
}

export default ModalCreate