const { asyncRequest } = require('./utils')


const getPullNumber = async (head, message) => {
  const { err, data } = await asyncRequest(`/repos/org/iot/course/pulls?state=open?head=${head}`)
  data && console.log({ data: data })  
  err && console.log({ err:err.message })
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:head }]
  } = JSON.parse(e.body)

  const pullNumber = await getPullNumber(head)
  // console.log({ pullNumber })
  // state === 'success' && prClose(pullNumber)

  cb(null, { statusCode: 200 })

}
