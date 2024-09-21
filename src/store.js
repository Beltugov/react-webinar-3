import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Получение записи по коду
   * @param code
   */
  getItem(code) {
      return this.state.list.find((value) => value.code === code)
  }

  /**
   * Получение записи по коду из корзины
   * @param code
   */
  getCardItem(code) {
    return this.state.card.find((value) => value.code === code)
  }


  /**
   * Добавление новой записи в корзину
   * @param code
   */
  addItemInCard(code) {
    const inCard = this.getCardItem(code)
    const item = this.getItem(code)
    let card = this.state.card

    if (inCard) {
      card = card.map((elem) => {
        if (elem.code === code) elem.count = elem.count + 1
        return elem
      })
    } else {
      item.count = 1;
      card = [...card, item]
    }

    this.setState({
      ...this.state,
      card: card
    });
  }



  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Создание новой записи
   */
  createItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      card: this.state.card.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
