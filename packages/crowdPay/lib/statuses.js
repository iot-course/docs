const { asyncRequest } = require('./utils')


const closePR = async (pullNumber, message, success) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    {
      state: "closed",
      body: success
        ? message +'\n >Crispy Lettuce 💵 😎 \n\n--added by TA-Bot'
        : message + '\n>This Robot has deemed you unworthy 🤖 💥 😭 \n\n--added by TA-Bot'
    }
  )
}

const mergePR = async (pullNumber, head, ) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    {commit_message: 'all gravy'}
  )

  statusCode === 200 && closePR(pullNumber, message, true)
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

  console.log({ state, message })

  if (state === 'success' && !message.startsWith("Merge")) {
    const pullNumber = await getPullNumber(head, message)
    pullNumber && mergePR(pullNumber, head, message)
  }

  if(state === 'failure'){
    closePR(pullNumber, message)
  }


  cb(null, { statusCode: 200 })

}
