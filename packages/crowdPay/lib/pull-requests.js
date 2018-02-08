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
    if (body.replace(/^\D+/, '')) {
      const points = await getIssuePoints()
      const test = (additions + 5 >= points) && (additions <= points * 50)
      await prReview(number, test)
      !test && closePR(number, body)
    }

  }


  cb(null, { statusCode: 200 })

}

/*

},
"html": {
  "href": "https://github.com/iot-course/org/pull/135"
},
"issue": {
  "href": "https://api.github.com/repos/iot-course/org/issues/135"
},
"comments": {
  "href": "https://api.github.com/repos/iot-course/org/issues/135/comments"
},
"review_comments": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/135/comments"
},
"review_comment": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
},
"commits": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/135/commits"
},
"statuses": {
  "href": "https://api.github.com/repos/iot-course/org/statuses/fd56af496de043c777b5673b940fa01d6b34a0ae"
}
},
"author_association": "OWNER",
"merged": false,
"mergeable": null,
"rebaseable": null,
"mergeable_state": "unknown",
"merged_by": null,
"comments": 0,
"review_comments": 0,
"maintainer_can_modify": false,
"commits": 15,
"additions": 5923,
"deletions": 18,
"changed_files": 6
}
*/
