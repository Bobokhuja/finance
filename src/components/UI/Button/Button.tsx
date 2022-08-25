import classes from './Button.module.scss'
import { ReactNode } from 'react'

interface IButton {
  type?: 'submit' | 'button'
  onClick?: (any: any) => void
  children: ReactNode
  className?: string
}

function Button({type = 'button', onClick, children, className}: IButton) {
  const cls = [
    classes.Button,
    className ? className : ''
  ]
  return (
    <button
      type={type}
      className={cls.join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button