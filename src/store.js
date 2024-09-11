/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    this.uniqCode = new Set();
    this.state.list.forEach((item) => this.uniqCode.add(item.code))
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
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const generateUniqCode = (uniqCodeSet) => {
      let generatedCode = uniqCodeSet.size;
      while (uniqCodeSet.has(generatedCode)) {
        generatedCode++;
      }
      return generatedCode;
    }

    let uniqCode;

    if (this.uniqCode.has(this.uniqCode.size + 1)) {
      uniqCode = generateUniqCode(this.uniqCode);
    } else {
      uniqCode = this.uniqCode.size + 1;
    }
    this.uniqCode.add(uniqCode)



    this.setState({
      ...this.state,
      list: [...this.state.list, { code: uniqCode, title: 'Новая запись' , selectedCount: 0}],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
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
          item.selected = !item.selected;
          item.selected && item.selectedCount++
        } else {
          item.selected = false;
        }

        return item;
      }),
    });
  }
}

export default Store;
