import classes from './Radio.module.scss'

export interface IRadio {
  label: string
  checked?: boolean
  name: string
  value: string
  onChange?: (event: any) => void
}

function Radio({label, name, value, checked = false, onChange}: IRadio) {
  return (
    <div className={classes.RadioWrap}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        className={classes.Radio}
        id={value}
        onChange={onChange}
      />
      <label
        htmlFor={value}
        className={classes.Label}
      >{label}</label>
    </div>
  )
}

export default Radio