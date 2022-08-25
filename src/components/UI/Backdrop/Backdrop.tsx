import classes from './Backdrop.module.scss'

interface IBackdrop {
  onClick?: () => void
}

function Backdrop({onClick}: IBackdrop) {
  return (
    <div
      onClick={onClick}
      className={classes.Backdrop}
    />
  )
}

export default Backdrop