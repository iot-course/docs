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

  if (state === 'success' && !message.startsWith('Merge')) {
    const pullNumber = await getPullNumber(branch)
    await mergePR(pullNumber, branch)
    await closePR(pullNumber, message)

    const res = await deleteBranch(branch)

    console.log({ deleteBranchRes: res })

  }

  if(state === 'failure'){
    const pullNumber = await getPullNumber(branch)
    closePR(pullNumber, message)
  }


  cb(null, { statusCode: 200 })

}

/*
/issues/111/comments"
    },
    "review_comments": {
      "href": "https://api.github.com/repos/iot-course/org/pulls/111/comments"
    },
    "review_comment": {
      "href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
    },
    "commits": {
      "href": "https://api.github.com/repos/iot-course/org/pulls/111/commits"
    },
    "statuses": {
      "href": "https://api.github.com/repos/iot-course/org/statuses/5a5121dd275878fd3fb4fa01672f2683545804c5"
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
  "commits": 1,
  "additions": 3,
  "deletions": 37,
  "changed_files": 1
}

*/
