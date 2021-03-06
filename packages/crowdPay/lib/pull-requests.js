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
    //TODO: if you get a diff body on a pr this will fail. make fail gracefully
    const points = await getIssuePoints(body.replace(/^\D+/, ''))
    console.log({ points })
    const test = (additions + 5 >= points) && (additions <= points * 50)
    await prReview(number, test)
    !test && await closePR(number, body)
  }


  cb(null, { statusCode: 200 })

}
