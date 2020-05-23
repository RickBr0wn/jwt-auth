// sample columnId: 5ebb28e1a75c327d700b0d2e

export default {
  getAllData: async () =>
    await fetch(`/auth/get_all_data`).then(res => {
      if (res.status !== 200) {
        return { message: { msgBody: 'unauthorized!!!!', msgError: true } }
      }
      return res.json().then(data => data)
    }),
  moveTask: async obj =>
    await fetch(`/auth/move_task/${obj.columnId}`, {
      method: 'post',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.status !== 200) {
        return { message: { msgBody: 'unauthorized!!!!', msgError: true } }
      }
      return res.json().then(data => data)
    }),
}
