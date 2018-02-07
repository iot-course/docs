exports.handler = (e, _, cb) => {

  const {
    state,
    commit:{ message },
    branches
  } = JSON.parse(e.body)

  console.log({ state, branches, message })
  // const pullNumber = await getPullNumber()
  // state === 'success' && prClose(pullNumber)

  cb(null, { statusCode: 200 })

}
