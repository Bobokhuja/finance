import React, { useState } from 'react'
import classes from './App.module.scss';
import Footer from './components/Footer/Footer'
import ModalCreate from './components/modals/ModalCreate/ModalCreate'
import Header from './components/Header/Header'
import Button from './components/UI/Button/Button'
import TransactionList from './components/TransactionList/TransactionList'
import { useAppSelector } from './app/hooks'

function App() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const {cash} = useAppSelector(state => state.transactions)

  return (
    <div className={classes.App}>
      <Header/>

      <p className={`${classes.Cash} ${cash < 0 ? classes.Minus : ''}`}>{cash}</p>

      <Button
        className={classes.CreateButton}
        onClick={() => setIsShowModal(true)}
      >
        Создать операцию
      </Button>
      <TransactionList/>
      <Footer/>
      <ModalCreate isShow={isShowModal} onHide={() => setIsShowModal(false)}/>
    </div>
  );
}

export default App;
