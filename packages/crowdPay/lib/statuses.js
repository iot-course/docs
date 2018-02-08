const { asyncRequest } = require('./utils')


const closePR = async (pullNumber, head, success) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    {
      state: "closed",
      body: success
        ? `${head} \n\n> Crispy Lettuce 💵 😎  \n\n- added automagically`
        : `${head} \n\n> This Robot has deemed you unworthy 🤖 💥 😭 \n\n- added automagically`
    }
  )
}

const mergePR = async (pullNumber, head) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    {commit_message: 'all gravy'}
  )

  statusCode === 200 && closePR(pullNumber, head, true )
}

const getPullNumber = async head => {
  const { data:pulls } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  console.log({pulls})
  const [{ number }] = pulls.length === 1 ? pulls[0] : null

  return number
    ? number
    : console.log('could not find this feature in among the PRs');
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    branches: [{ name:head }]
  } = JSON.parse(e.body)


  if (state === 'success') {
    const pullNumber = await getPullNumber(head)
    pullNumber && mergePR(pullNumber, head)
  }

  if(state === 'failure'){
    closePR(pullNumber, head)
  }


  cb(null, { statusCode: 200 })

}
