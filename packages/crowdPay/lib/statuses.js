const { asyncRequest } = require('./utils')

const closePR = async (pullNumber, message, success) => {

   await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    {
      state: 'closed',
      body: success
        ? `${message} \n\n> Crispy Lettuce 💵 😎  (added automagically)`
        : `${message} \n\n> This robot has deemed you unworthy 🤖 💥 😭 `
    }
  )
}


const mergePR = async pullNumber => {

  await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    { commit_message: 'all gravy' }
  )

}


const getPullNumber = async head => {
  const { data:pulls } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  /* eslint-disable no-shadow */
  const { number, body } = (pulls.filter( ({ body }) => body.startsWith('closes') )[0] || {})
  /* eslint-enable */
  return number && body
    ? { number, body }
    /* eslint-disable no-console */
    : console.log('could not find this feature in among the PRs')
    /* eslint-enable */
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:branch }]
  } = JSON.parse(e.body)

  /* eslint-disable no-console */
  console.log({ state, message })
  /* eslint-enable */

  if (state === 'success' && !message.startsWith('Merge')) {
    const { number, body } = await getPullNumber(branch)
    await mergePR(number, branch)
    closePR(number, body, true)
  }

  if (state === 'failure') {
    const { number, body } = await getPullNumber(branch)
    closePR(number, body)
  }

  cb(null, { statusCode: 200 })

}
