import classes from './Modal.module.scss'
import { CSSTransition } from 'react-transition-group'
import { ReactNode } from 'react'
import Backdrop from '../UI/Backdrop/Backdrop'

export interface IModal {
  children: ReactNode
  isShow: boolean
  onHide: () => void
}

function Modal({onHide, children, isShow}: IModal) {

  return (
    <div className={classes.Modal}>
      <CSSTransition
        timeout={500}
        in={isShow}
        unmountOnExit
        mountOnEnter
        classNames={{
          enterActive: classes.EnterActive,
          exitActive: classes.ExitActive,
        }}
      >
        <Backdrop onClick={() => onHide()}/>
      </CSSTransition>
      <CSSTransition
        timeout={300}
        in={isShow}
        unmountOnExit
        mountOnEnter
        classNames={{
          enterActive: classes.EnterContent,
          exitActive: classes.ExitContent,
        }}
      >
        <div className={classes.Content}>
          {children}
        </div>
      </CSSTransition>
    </div>
  )
}

export default Modal