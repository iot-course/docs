const { asyncRequest } = require('./utils')

const closePR = async (number, body) => {
  await asyncRequest(
    `/repos/iot-course/org/pulls/${number}`,
    'patch',
    {
      state: 'closed',
      body: `${body} \n\n> This robot has deemed you unworthy 🤖 💥 😭 `
    }
  )
}

const prReview = async (number, test) => {

  const approvedReview = {
    body: `Your code is adequate enough given the
             limitations of your species.`,
    event: 'APPROVE',
  }

  const changeReview = {
    body: 'You sure this code implements the feature fully?',
    event: 'REQUEST_CHANGES',
  }

  await asyncRequest(
    `/repos/iot-course/org/pulls/${number}/reviews`,
    'post',
    test ? approvedReview : changeReview
  )

}

const getIssuePoints = async issueNumber => {
  const { data:{ labels:[{ name:points }] } } = await asyncRequest(
    `/repos/iot-course/org/issues/${issueNumber}`
  )
  return +points
}

exports.handler = async (e, _, cb) => {

  const {
    action,
    number,
    pull_request:{
      body,
      additions
    }
  } = JSON.parse(e.body)

  console.log({ body })

  if (action === 'opened') {
    const points = await getIssuePoints(body.replace(/^\D+/, ''))
    console.log({ points })
    const test = (additions + 5 >= points) && (additions <= points * 50)
    await prReview(number, test)
    !test && closePR(number, body)
  }


  cb(null, { statusCode: 200 })

}

/*
Serverless: Uploading artifacts...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
....................
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
  pay: crowdpay-dev-pay
Serverless: Removing old service versions...
*/
