import React, {useCallback, useEffect, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";
import Card from "./components/card";
import Item from "./components/item";


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)

  const list = store.getState().list;
  const card = store.getState().card

  const callbacks = {
    addItem: useCallback((item) => {
      store.addItemInCard(item.code)
    }, [card]),

    deleteItem: useCallback((item) => {
      store.deleteItem(item.code)
    }, [card]),

    modalAction: (state) => setModalIsOpen(state)
  };

  useEffect(() => {
    const price = card.reduce((acc, currentValue) => acc + currentValue.price * currentValue.count, 0)
    setTotalPrice(price)
  }, [card])


  return (
    <PageLayout>
      <Head title="Магазин"/>
      <Controls modalIsOpen={callbacks.modalAction} cardList={card} totalPrice={totalPrice}/>
      <List
        list={list}
        onClick={callbacks.addItem}
        comp={(item, onClick) => <Item item={item} onClick={onClick} />}
      />
      <Modal isOpen={modalIsOpen}>
        <Card cardList={card} modalIsOpen={callbacks.modalAction} onClick={callbacks.deleteItem}
              totalPrice={totalPrice}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
