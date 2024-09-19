import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props = {
  onClick: () => {
  }
}) {

  const callbacks = {
    onClick: () => {
      props.onClick(props.item);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <div className="Item-info">
          <span>{props.item.price} ₽</span>
          {props.type === "Card-list" ? <span>{props.item.count | 0} шт</span> : ""}
        </div>
        <button onClick={callbacks.onClick}>{props.type === "Card-list" ? "Удалить" : "Добавить"}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
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


export default React.memo(Item);
