export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: "comments/load-start"})
      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружен успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  send: (id, text, type, token) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: `api/v1/comments`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Token": token
          },
          body: JSON.stringify({
            "text": text,
            "parent": {
              "_id": id, "_type": type
            }
          })
        })
        dispatch({type: "comments/add", payload: res.data.result})
        console.log(res.data.result)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
