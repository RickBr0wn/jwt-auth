export default {
  getTodos: () => {
    return fetch('/auth/todos').then(res => {
      if (res.status !== 401) {
        return res.json().then(data => data)
      } else {
        return { message: { msgBody: 'unauthorized!!!!', msgError: true } }
      }
    })
  },
  postTodo: todo => {
    return fetch('/auth/todo', {
      method: 'post',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.status !== 401) {
        return res.json().then(data => data)
      } else {
        return { message: { msgBody: 'unauthorized!!!!', msgError: true } }
      }
    })
  },
}
