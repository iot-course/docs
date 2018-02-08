const { asyncRequest } = require('./utils')

const closePR = async (pullNumber, message, success) => {

   await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    {
      state: "closed",
      body: success
        ? `${message} \n\n> Crispy Lettuce 💵 😎  (added automagically)`
        : `${message} \n\n> This robot has deemed you unworthy 🤖 💥 😭 `
    }
  )
}


const mergePR = async (pullNumber, head) => {

  await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    {commit_message: 'all gravy'}
  )
}


const getPullNumber = async head => {
  const { data:pulls } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  console.log({pulls})
  const { number, body } = (pulls.filter( ({body}) => body.startsWith('closes') )[0] || {})

  return number && body
    ? { number, body }
    : console.log('could not find this feature in among the PRs')

}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:branch }]
  } = JSON.parse(e.body)

  console.log({ state, message})

  if (state === 'success' && !message.startsWith('Merge')) {
    const {number, body } = await getPullNumber(branch)
    await mergePR(pullNumber, branch)
    closePR(number, body, true)
  }

  if(state === 'failure'){
    const { number, body } = await getPullNumber(branch)
    closePR(number, body)
  }


  cb(null, { statusCode: 200 })

}
