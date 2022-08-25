import classes from './Footer.module.scss'
import Input from '../UI/Input/Input'
import Radio from '../UI/Radio/Radio'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeStatus, StatusFilter, searchTodo } from '../../features/filters/filtersSlice'

function Footer() {
  const dispatch = useAppDispatch()
  const {status, search} = useAppSelector(state => state.filters)

  return (
    <footer className={classes.Footer}>
      <div className={classes.Wrap}>
        <Input
          type="text"
          value={search}
          placeholder="Поиск..."
          onChange={
            (event) => dispatch(searchTodo(event.target.value))
          }
          className={classes.Input}
        />
        <form>
          <Radio
            label="Все"
            name="filter"
            value={StatusFilter.All}
            onChange={() => dispatch(changeStatus('all'))}
            checked={status === StatusFilter.All}
          />
          <Radio
            label="Выполненные"
            name="filter"
            value={StatusFilter.Completed}
            onChange={() => dispatch(changeStatus('completed'))}
            checked={status === StatusFilter.Completed}
          />
          <Radio
            label="Не выполненные"
            name="filter"
            value={StatusFilter.Active}
            onChange={() => dispatch(changeStatus('active'))}
            checked={status === StatusFilter.Active}
          />
        </form>
      </div>
    </footer>
  )
}

export default Footer