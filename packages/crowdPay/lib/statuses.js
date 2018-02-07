const { asyncRequest } = require('./utils')


const deleteBranch = async (head) => {
  const { err, data } = await asyncRequest(
    `/repos/iot-course/org/git/refs/heads/${head}`,
    'delete',
  )
  data && console.log({ data }, '-----data')
  err && console.log({ err }, '---err')
}


const closePR = async pullNumber => {
  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    { "state": "closed" },
  )
  console.log({closedStatus: statusCode })
}


const mergePR = async (pullNumber, head) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    { commit_message: 'This robot has deemed you a worthy humanoid.' }
  )

  statusCode===200 && deleteBranch(head)
}

const getPullNumber = async (head, message) => {
  const { data:pulls } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  const { number } = (pulls.filter( ({body}) => message === body )[0] || {})

  return number
    ? number
    : console.log('could not match pr body to commit msg');
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:head }]
  } = JSON.parse(e.body)

  console.log({ state, message })

  if (state === 'success' && !message.startWith("Merge branch")) {
    const pullNumber = await getPullNumber(head, message)
    pullNumber && mergePR(pullNumber, head)
  }

  if(state === 'failure'){
    closePR(pullNumber)
  }


  cb(null, { statusCode: 200 })

}


/*
Response if pull request has been merged
Status: 204 No Content
Response if pull request has not been merged
Status: 404 Not Found
Merge a pull request (Merge Button)
PUT /repos/:owner/:repo/pulls/:number/merge
Input
Name	Type	Description
commit_title	string	Title for the automatic commit message.
commit_message	string	Extra detail to append to automatic commit message.
sha	string	SHA that pull request head must match to allow merge.
merge_method	string	Merge method to use. Possible values are merge, squash or rebase. Default is merge.
Response if merge was successful
Status: 200 OK
{
  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
  "merged": true,
  "message": "Pull Request successfully merged"
}
Response if merge cannot be performed
Status: 405 Method not allowed
{
  "message": "Pull Request is not mergeable",
  "documentation_url": "https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button"
}
Response if sha was provided and pull request head did not match
Status: 409 Conflict
{
  "message": "Head branch was modified. Review and try the merge again.",
  "documentation_url": "https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button"
}
Labels, assignees, and milestones
Every pull request is an issue, but not every issue is a pull request. For this reason, "shared" actions for both features, like manipulating assignees, labels and milestones, are provided within the Issues API.

Custom media types
These are the supported media types for pull requests. You can r

*/
