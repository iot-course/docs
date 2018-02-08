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
},
"review_comment": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
},
"commits": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/144/commits"
},
"statuses": {
  "href": "https://api.github.com/repos/iot-course/org/statuses/5f69e1b2f6a09a2d328bd08368a704a149ebfc50"
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
"additions": 1,
"deletions": 1,
"changed_files": 1
}
✨  Done in 3.00s.

*/
