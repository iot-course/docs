const { asyncRequest } = require('./utils')

const getPullNumber = async (head, message) => {
  const { err, data:[{ number, body }] } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  return message === body
    ? number
    : console.error('could not match pr body to commit msg');
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:head }]
  } = JSON.parse(e.body)

  const pullNumber = await getPullNumber(head, message)
  console.log({ pullNumber })
  // state === 'success' && pullNumber && prClose(pullNumber)

  cb(null, { statusCode: 200 })

}
