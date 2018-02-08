const { asyncRequest } = require('./utils')


const deleteBranch = async ref => {
  const { err, data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/git/refs/${ref}`,
    'delete',
  )

  return {err, statusCode}
}


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
  const { number } = (pulls.filter( ({body}) => body.startsWith('closes') )[0] || {})

  return number
    ? number
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

    const pullNumber = await getPullNumber(branch)

    await mergePR(pullNumber, branch)
    await deleteBranch(branch)
    await closePR(pullNumber, message, true)

  }

  if(state === 'failure'){
    const pullNumber = await getPullNumber(branch)
    closePR(pullNumber, message)
  }


  cb(null, { statusCode: 200 })

}
