const { asyncRequest } = require('./utils')

const closePR = async pullNumber => {
  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    { "state": "closed" },
  )
  console.log({closedStatus: statusCode })
}


const mergePR = async (pullNumber, head) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    { commit_message: 'This robot has deemed you a worthy humanoid.' }
  )
  console.log({ statusCode })
  closePR(pullNumber)
}

const getPullNumber = async (head, message) => {
  const { data:pulls } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  const { number } = (pulls.filter( ({body}) => message === body )[0] || {})

  return number
    ? number
    : console.log('could not match pr body to commit msg');
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:head }]
  } = JSON.parse(e.body)

  console.log({ state })

  if (state === 'success' && !message.startsWith("Merge")) {
    const pullNumber = await getPullNumber(head, message)
    pullNumber && mergePR(pullNumber, head)
  }

  if(state === 'failure'){
    closePR(pullNumber)
  }


  cb(null, { statusCode: 200 })

}
