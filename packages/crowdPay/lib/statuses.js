const { asyncRequest } = require('./utils')


const closePR = async (pullNumber, head, success) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    {
      state: "closed",
      body: success
        ? `${head} \n\n> Crispy Lettuce 💵 😎  (added automagically)`
        : `${head} \n\n> This robot has deemed you unworthy 🤖 💥 😭 `
    }
  )
}

const mergePR = async (pullNumber, head) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    {commit_message: 'all gravy'}
  )

  statusCode === 200 && closePR(pullNumber, head, true )
}

const getPullNumber = async head => {
  const { data:pulls } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  const { number } = (pulls.filter( ({body}) => body.startsWith('closes') )[0] || {})

  return number
    ? number
    : console.log('could not find this feature in among the PRs');
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:head }]
  } = JSON.parse(e.body)


  const pullNumber = await getPullNumber(head)

  if (state === 'success' && !message.startsWith("Merges")) {
    pullNumber && mergePR(pullNumber, head)
  }

  if(state === 'failure'){
    closePR(pullNumber, head)
  }


  cb(null, { statusCode: 200 })

}

/*
"review_comment": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
},
"commits": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/103/commits"
},
"statuses": {
  "href": "https://api.github.com/repos/iot-course/org/statuses/550654399ab331b6fa878b2d9ae9d86768b9acff"
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
"commits": 3,
"additions": 3,
"deletions": 1,
"changed_files": 2
}

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯
*/
