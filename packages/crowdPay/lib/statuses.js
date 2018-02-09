const { Lambda } = require('aws-sdk')
const { asyncRequest } = require('./utils')

const lambda = new Lambda()

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
  const { number, body } = (pulls.filter( ({ body }) => body.startsWith('closes') )[0] || {})

  return number && body
    ? { number, body }
    : console.log('could not find this feature in among the PRs')

}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message, author:{ email } } },
    branches: [{ name:branch }]
  } = JSON.parse(e.body)

  /* eslint-disable no-console */
  console.log({ state, message })
  /* eslint-enable */

  const params = {
    FunctionName: 'crowdpay-dev-pay',
    InvocationType: 'Event',
    Payload: 'test',
  }

  if (state === 'success' && !message.startsWith('Merge') ) {
    const { number, body } = await getPullNumber(branch)
      await mergePR(number, branch)
      await closePR(number, body, true)
      lambda.invoke(params).promise()

  }

  if (state === 'failure') {
    const { number, body } = await getPullNumber(branch)
    closePR(number, body)
  }

  cb(null, { statusCode: 200 })

}

/*
dsd
fsdf
ds
dfsd
d
sds

ds
sdd
sfd
d
sd
sds

*/
