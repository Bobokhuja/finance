import classes from './Header.module.scss'

function Header() {
  return (
    <header className={classes.Header}>
      <h1 className={classes.Title}>Finance</h1>
    </header>
  )
}

export default Header