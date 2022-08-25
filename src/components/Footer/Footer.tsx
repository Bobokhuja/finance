import classes from './Footer.module.scss'
import Input from '../UI/Input/Input'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeStatus, StatusFilter, searchTodo } from '../../features/filters/filtersSlice'
import Radio from '../UI/Radio/Radio'

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
            label="Доходы"
            name="filter"
            value={StatusFilter.Income}
            onChange={() => dispatch(changeStatus('income'))}
            checked={status === StatusFilter.Income}
          />
          <Radio
            label="Расходы"
            name="filter"
            value={StatusFilter.Consumption}
            onChange={() => dispatch(changeStatus('consumption'))}
            checked={status === StatusFilter.Consumption}
          />
        </form>
      </div>
    </footer>
  )
}

export default Footer