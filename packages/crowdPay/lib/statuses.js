const { asyncRequest } = require('./utils')


const deleteBranch = async ref => {
  const { err, data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/git/refs/${ref}`,
    'delete',
  )

  return {err, statusCode}
}


const closePR = async (pullNumber, message) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    {
      state: "closed",
      body: success
        ? `${message} \n\n> Crispy Lettuce 💵 😎  (added automagically)`
        : `${message} \n\n> This robot has deemed you unworthy 🤖 💥 😭 `
    }
  )

  return statusCode===200
}


const mergePR = async (pullNumber, head) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    {commit_message: 'all gravy'}
  )

  return statusCode===200
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

  if (state === 'success' && !message.startsWith('Merges')) {
    const pullNumber = await getPullNumber(branch);

    await mergePR(pullNumber, branch) &&
    await closePR(pullNumber, message)

    const res = await deleteBranch(branch)

    console.log({ deleteBranchRes: res })

  }

  if(state === 'failure'  && message.startsWith('closes')){
    const pullNumber = await getPullNumber(branch)
    closePR(pullNumber, message)
  }


  cb(null, { statusCode: 200 })

}

/*
..............
Serverless: Stack update finished...
Service Information
service: crowdpay
stage: dev
region: us-east-1
stack: crowdpay-dev
api keys:
  None
endpoints:
  ANY - https://ff99j1lzsi.execute-api.us-east-1.amazonaws.com/dev/issues
  ANY - https://ff99j1lzsi.execute-api.us-east-1.amazonaws.com/dev/pull-requests
  ANY - https://ff99j1lzsi.execute-api.us-east-1.amazonaws.com/dev/statuses
functions:
  issues: crowdpay-dev-issues
  pull-requests: crowdpay-dev-pull-requests
  statuses: crowdpay-dev-statuses
Serverless: Removing old service versions...

~/Build/iot-course/org/packages/crowdPay Signup-and-Login 29s
❯ msg='setting up' yarn push
yarn run v1.3.2
warning ../../package.json: No license field
$ git add -A && git commit -m "$msg" && git push origin $(git rev-parse --abbrev-ref HEAD)
On branch Signup-and-Login
nothing to commit, working tree clean
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
*/
