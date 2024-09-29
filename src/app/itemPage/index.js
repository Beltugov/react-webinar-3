import {memo, useCallback, useEffect, useState} from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import {useLocation} from "react-router-dom";
import BasketTool from "../../components/basket-tool";
import ItemInfo from "../../components/item-info";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Menu from "../../components/menu";


function ItemPage() {
  const store = useStore();
  const {pathname} = useLocation();

  const [item, setItem] = useState(null);

  const fetchData = async () => {
    const response = await fetch(`/api/v1/${pathname}?fields=*,madeIn(title,code),category(title)`);
    const {result} = await response.json();
    setItem(result)
  }

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.modals.close();
    fetchData()
  }, [store, pathname]);

  return item && (
    <PageLayout>
      <Head title={item.title}/>
      <Menu>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Menu>
      <ItemInfo item={item} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  )
}

export default memo(ItemPage)
