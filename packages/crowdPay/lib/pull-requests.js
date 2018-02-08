const { asyncRequest } = require('./utils')


const approvedReview = {
  body: `Your code is adequate enough given the
           limitations of your species.`,
  event: 'APPROVE',
}

const changeReview = {
  body: 'You sure this code implements the feature fully?',
  event: 'REQUEST_CHANGES',
}


const prReview = async (number, loc, points) => {

  const { err, data: { statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${number}/reviews`,
    'post',
    loc + 5 >= +points ? approvedReview : changeReview
  )
  statusCode && console.log({ prReviewCode: statusCode })
}

const getIssuePoints = async issueNumber => {
  const { err, data:{ labels:[{ name:points }] } } = await asyncRequest(
    `/repos/iot-course/org/issues/${issueNumber}`
  )
  err && console.log({ getIssuePointsErr: err.message })
  return points
}

exports.handler = async (e, _, cb) => {

  const {
    action,
    number,
    pull_request:{
      body,
      additions,
      deletions
    }
  } = JSON.parse(e.body)


  if (action === 'opened') {
    const loc = additions + deletions
    const points = await getIssuePoints(body.replace(/^\D+/, ''))
    prReview(number, loc, points)
  }


  cb(null, { statusCode: 200 })

}
