const { asyncRequest } = require('./utils')


const approvedReview = {
  body: `Your code is adequate enough given the
           limitations of your species.`,
  event: 'APPROVE',
}

const changeReview = {
  body: 'You sure the tests for this are okay?',
  event: 'REQUEST_CHANGES',
}


const prReview = async (number, loc, points) => {

  const { data: { statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${number}/reviews`,
    'post',
    loc * 2 > points ? approvedReview : changeReview
  )

  statusCode !== 200 && console.log({ prReviewCode: statusCode })

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
    body,
    pull_request:{
      // head:{ sha },
      additions,
      deletions
    }
  } = JSON.parse(e.body)


  const points = await getIssuePoints(body.replace(/^\D+/, ''))
  const loc = additions + deletions

  action === 'opened' && prReview(number, loc, points)
  
  cb(null, { statusCode: 200 })

}

// {"title":"Some breaking feature","head":"check-changes-of-commit",
// "base":"master", "body":"close #1"}
