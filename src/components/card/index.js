import PropTypes from "prop-types";
import React from "react";
import Head from "../head";
import List from "../list";
import "./style.css"
import CardItem from "../cardItem";

function Card({cardList = [], modalIsOpen, onClick, totalPrice}) {
  return (
    <div className="Card">
      <Head title={"Корзина"}>
        <button className="Card-action" onClick={() => modalIsOpen(false)}>Закрыть</button>
      </Head>
      <div className="Card-list">
        <List list={cardList} onClick={onClick} comp={(item, onClick) => <CardItem item={item} onClick={onClick} />}/>
        <div className="Card-total">
          <span>
            Итого:
          </span>
          <span>
            {totalPrice} ₽
          </span>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  cardList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })),
  modalIsOpen: PropTypes.func,
  onClick: PropTypes.func


};

export default React.memo(Card);
