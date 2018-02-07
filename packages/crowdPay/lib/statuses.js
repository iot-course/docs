
exports.handler = (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name }]
  } = JSON.parse(e.body)

  console.log({ state, name, message })
  // const pullNumber = await getPullNumber()
  // state === 'success' && prClose(pullNumber)

  cb(null, { statusCode: 200 })

}
