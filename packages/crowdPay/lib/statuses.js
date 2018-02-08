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

  if (state === 'success' && !message.startsWith('Merge') ) {
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
"maintainer_can_modify": false,
"commits": 3,
"additions": 5,
"deletions": 7,
"changed_files": 2
}
✨  Done in 11.10s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login 11s
❯ body='closes #1' yarn submit
yarn run v1.3.2
warning ../../package.json: No license field
$ curl -u $(git config user.name) -d '{ "title": "'$(git rev-parse --abbrev-ref HEAD)'", "head": "'$(git rev-parse --abbrev-ref HEAD)'", "base": "master", "body":"'"$body"'"}' https://api.github.com/repos/iot-course/org/pulls
Enter host password for user 'wordyallen':
{
"message": "Validation Failed",
"errors": [
  {
    "resource": "PullRequest",
    "code": "custom",
    "message": "No commits between master and Signup-and-Login"
  }
],
"documentation_url": "https://developer.github.com/v3/pulls/#create-a-pull-request"
}
✨  Done in 3.22s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login*
❯
*/
