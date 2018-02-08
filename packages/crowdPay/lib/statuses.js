const { asyncRequest } = require('./utils')


const deleteBranch = async ref => {
  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/git/refs/${ref}`,
    'delete',
  )

  statusCode && console.log({ deleteBranchCode: statusCode })
  return statusCode===200
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


  if (state === 'success' && !message.startsWith("Merges")) {
    const pullNumber = await getPullNumber(branch);

    await mergePR(pullNumber, branch) &&
    await closePR(pullNumber, message) &&
    await deleteBranch(branch) &&
    console.log('merge successful')

  }

  if(state === 'failure'){
    const pullNumber = await getPullNumber(branch)
    closePR(pullNumber, message)
  }


  cb(null, { statusCode: 200 })

}

/*
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
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
❯
*/
