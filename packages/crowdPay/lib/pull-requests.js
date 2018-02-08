const { asyncRequest } = require('./utils')



const closePR = async number => {
  console.log({c})
  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${number}`,
    'patch',
    {
      state: "closed",
      body: `${head} \n\n> This robot has deemed you unworthy 🤖 💥 😭 `
    }
  )

  statusCode && console.log({ closePR: statusCode })
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

  const { data: { statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${number}/reviews`,
    'post',
    test ? approvedReview : changeReview
  )
  statusCode && console.log({ prReviewCode: statusCode })
}

// yo

const getIssuePoints = async issueNumber => {
  const { err, data:{ labels:[{ name:points }] } } = await asyncRequest(
    `/repos/iot-course/org/issues/${issueNumber}`
  )
  err && console.log({ getIssuePointsErr: err.message })
  return +points
}

exports.handler = async (e, _, cb) => {

  const {
    action,
    number,
    pull_request:{
      body,
      additions,
    }
  } = JSON.parse(e.body)



  if (action === 'opened') {
    const points = await getIssuePoints(body.replace(/^\D+/, ''))
    const test = (additions + 5 >= points) && (additions <= points * 50)
    prReview(number, test)
    test && closePR(number)
  }


  cb(null, { statusCode: 200 })

}
