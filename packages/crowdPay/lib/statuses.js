const { asyncRequest } = require('./utils')

const closePR = async pullNumber => {
  const { data:{ merged} } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'put',
  )

  console.log({merged})
}

const mergePR = async pullNumber => {
  const { data } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'patch',
    {"state": "closed" }
  )

}

const getPullNumber = async (head, message) => {
  const { data:pulls } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  const { number } = (pulls.filter( ({body}) => message === body )[0] || {})

  return number
    ? number
    : console.error('could not match pr body to commit msg');
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:head }]
  } = JSON.parse(e.body)

  console.log({state})

  const pullNumber = await getPullNumber(head, message)
  state === 'success' && pullNumber && mergePR(pullNumber)
  state === 'failure' && closePR(pullNumber)
  cb(null, { statusCode: 200 })

}
