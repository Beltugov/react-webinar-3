import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ modalIsOpen, cardList, totalPrice } = {
  modalIsOpen: () => {},
}) {
  const createString = () => {
    let string = cardList.length + " товар"

    if (cardList.length % 10 === 1 && cardList.length % 100 !== 11) {
      string += "";
    } else if (cardList.length % 10 > 1 && cardList.length % 10 < 5 && (cardList.length % 100 <= 12 || cardList.length % 100 >= 14)) {
      string += "а"
    } else {
      string += "ов";
    }

    string += " / "
    string += new Intl.NumberFormat("ru-RU", {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(totalPrice)
    return string
  }


  return (
    <div className="Controls">
      <div>В корзине:<span className="Controls-amount">{cardList.length === 0 ? "пусто" : createString()}</span></div>
      <button onClick={() => modalIsOpen(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  modalIsOpen: PropTypes.func,
};


export default React.memo(Controls);
