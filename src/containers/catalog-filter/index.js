import {memo, useCallback, useMemo} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.catalog.categories,
    category: state.catalog.params.category,
  }));

  const groupCategories = (categories) => {
    const parents = categories.filter((elem) => elem.parent === null)
    let children = categories.filter((elem) => elem.parent !== null)

    while (children.length !== 0) {
      children = children.map((child) => {
        child.title = "- " + child.title
        return child
      })

      const  temp = [...parents]
      temp.forEach((parent) => {
        const index = parents.indexOf(parent)
        parents.splice(index + 1, 0, ...children.filter((child) => child.parent._id === parent._id))
        children = children.filter((child) => child.parent._id !== parent._id)
      })
    }
    return parents
  }

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Сортировка
    onSelectCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        {value: 'order', title: 'По порядку'},
        {value: 'title.ru', title: 'По именованию'},
        {value: '-price', title: 'Сначала дорогие'},
        {value: 'edition', title: 'Древние'},
      ],
      [],
    ),
    categories: useMemo(
      () => [
        {value: 'all', title: 'Все'},
        ...groupCategories(select.categories).map((category) => ({value: category._id, title: category.title}))
      ]
    )
  };


  const {t} = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.categories} value={select.category} onChange={callbacks.onSelectCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
