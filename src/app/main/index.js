import {memo, useCallback, useEffect, useState} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from "../../components/pagination";
import Menu from "../../components/menu";

function Main(callback, deps) {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    page: state.catalog.page
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы
    changePage: useCallback(page => store.actions.catalog.setPage(page), [store])
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} path={"/articles/"+ item._id}/>;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин"/>
      <Menu>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Menu>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination perPage={10} count={select.count} currentPage={select.page} setPage={callbacks.changePage}/>
    </PageLayout>
  );
}

export default memo(Main);
