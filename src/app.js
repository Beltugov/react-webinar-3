import React, {useCallback, useEffect, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";
import Card from "./components/card";


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardList, setCardList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const list = store.getState().list;

  const callbacks = {
    addItem: useCallback((item) => {
      const cardItem = cardList.find((value) => value.code === item.code)
      if (!cardItem) {
        item.count = 1
        setCardList([...cardList, item])
      } else {
        setCardList(cardList.map((value) => {
          if (value.code === cardItem.code) value.count++
          return value
        }))
      }
    }, [cardList]),

    deleteItem: useCallback((item) => {
      setCardList(cardList.filter((value) => value.code !== item.code))
    }, [cardList]),

    modalAction: (state) => setModalIsOpen(state)
  };

  useEffect(() => {
    const price = cardList.reduce((acc, currentValue) => acc + currentValue.price * currentValue.count, 0)
    setTotalPrice(price)
  }, [cardList])


  return (
    <PageLayout>
      <Head title="Магазин"/>
      <Controls modalIsOpen={callbacks.modalAction} cardList={cardList} totalPrice={totalPrice}/>
      <List
        list={list}
        onClick={callbacks.addItem}
      />
      <Modal isOpen={modalIsOpen}>
        <Card cardList={cardList} modalIsOpen={callbacks.modalAction} onClick={callbacks.deleteItem} totalPrice={totalPrice}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
