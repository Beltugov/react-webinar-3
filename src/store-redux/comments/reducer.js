export const initState = {
  data: {},
  waiting: false
};

function reducer(state = initState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return {...state, data: {}, waiting: true};

    case 'comments/load-success':
      return {...state, data: action.payload.data, waiting: false};

    case 'comments/load-error':
      return {...state, data: {}, waiting: false};

    case 'comments/add':
      return {
        ...state, data: {
          items: [...state.data.items, action.payload],
          count: state.data.count + 1
        }
      }

    default:
      return state;
  }
}

export default reducer;
