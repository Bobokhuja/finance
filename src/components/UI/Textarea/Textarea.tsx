import classes from './Textarea.module.scss'
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

interface ITextarea {
  value: string
  placeholder: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  className: string
  required?: boolean
}

function Textarea({onChange, value, placeholder, className, required}: ITextarea) {
  const cls = [
    classes.Textarea,
    className || ''
  ]
  return (
    <div className={cls.join(' ')}>
      <label>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        >
          {value}
        </textarea>
      </label>
    </div>
  )
}

export default Textarea