import React, { useState } from 'react'
import classes from './App.module.scss';
import Footer from './components/Footer/Footer'
import ModalCreate from './components/modals/ModalCreate/ModalCreate'
import Header from './components/Header/Header'
import Button from './components/UI/Button/Button'

function App() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  return (
    <div className={classes.App}>
      <Header/>

      <Button
        className={classes.CreateButton}
        onClick={() => setIsShowModal(true)}
      >
        Создать операцию
      </Button>
      <Footer/>
      <ModalCreate isShow={isShowModal} onHide={() => setIsShowModal(false)}/>
    </div>
  );
}

export default App;
