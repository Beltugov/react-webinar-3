import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ modalIsOpen, cardList, totalPrice } = {
  modalIsOpen: () => {},
}) {
  return (
    <div className="Controls">
      <div>В корзине:<span className="Controls-amount">{cardList.length === 0 ? "пусто" : cardList.length + " товара / " + totalPrice + " ₽"}</span></div>
      <button onClick={() => modalIsOpen(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  modalIsOpen: PropTypes.func,
};


export default React.memo(Controls);
