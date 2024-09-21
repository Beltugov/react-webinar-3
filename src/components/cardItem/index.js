import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CardItem(props = {
  onClick: () => {
  }
}) {

  const callbacks = {
    onClick: () => {
      props.onClick(props.item);
    },
  };

  return (
    <div className='CardItem'>
      <div className="CardItem-code">{props.item.code}</div>
      <div className="CardItem-title">{props.item.title}</div>
      <div className="CardItem-actions">
        <div className="CardItem-info">
          <span>{new Intl.NumberFormat("ru-RU", {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(props.item.price)}</span>
          <span>{props.item.count | 0} шт</span>
        </div>
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};


export default React.memo(CardItem);
