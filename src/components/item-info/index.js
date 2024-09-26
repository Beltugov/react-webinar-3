import {memo} from "react";
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import "./style.css"

function ItemInfo({item, onAdd}) {
  const cn = bem('Item-info');
  return (
    <div className={cn()}>
      <div className={cn("description")}>{item.description}</div>
      <div className={cn("country")}>Страна производитель: <span>{item.madeIn.title}</span></div>
      <div className={cn("category")}>Категория: <span>{item.category.title}</span></div>
      <div className={cn("year")}>Год выпуска: <span>{item.edition}</span></div>
      <div className={cn("price")}>Цена: {numberFormat(item.price)} ₽</div>
      <div className={cn("btn")} >
        <button onClick={() => onAdd(item._id)}>Добавить</button>
      </div>
    </div>
  )
}

export default memo(ItemInfo)
