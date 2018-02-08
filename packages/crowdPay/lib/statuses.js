const { Lambda } = require('aws-sdk')
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
    Payload: email,
  }

  if (state === 'success' && !message.startsWith('Merge')) {
    const { number, body } = await getPullNumber(branch)
      await mergePR(number, branch)
      await closePR(number, body, true)
      new Lambda().invoke(params).promise()

  }

  if (state === 'failure') {
    const { number, body } = await getPullNumber(branch)
    closePR(number, body)
  }

  cb(null, { statusCode: 200 })

}

/*
functions:
  issues: crowdpay-dev-issues
  pull-requests: crowdpay-dev-pull-requests
  statuses: crowdpay-dev-statuses
  pay: crowdpay-dev-pay
Serverless: Removing old service versions...

~/Build/iot-course/org/packages/crowdPay Signup-and-Login* 24s
❯ msg='setting up' yarn push
yarn run v1.3.2
warning ../../package.json: No license field
$ git add -A && git commit -m "$msg" && git push origin $(git rev-parse --abbrev-ref HEAD)
[Signup-and-Login 7095c57] setting up
 2 files changed, 4 insertions(+), 6 deletions(-)
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (7/7), done.
Writing objects: 100% (7/7), 645 bytes | 645.00 KiB/s, done.
Total 7 (delta 6), reused 0 (delta 0)
remote: Resolving deltas: 100% (6/6), completed with 6 local objects.
To https://github.com/iot-course/org
   37dba7c..7095c57  Signup-and-Login -> Signup-and-Login
✨  Done in 2.11s.

*/
