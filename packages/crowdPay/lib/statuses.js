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
  console.log({statusCode })
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

  if (state === 'success' && message.startWith("Merge branch")) {
    const pullNumber = await getPullNumber(head, message)
    pullNumber && mergePR(pullNumber, head)
  }

  if(state === 'failure'){
    closePR(pullNumber)
  }


  cb(null, { statusCode: 200 })

}

/*
Name	Type	Description
sha	type	Required. The SHA1 value to set this reference to
force	boolean	Indicates whether to force the update or to make sure the update is a fast-forward update. Leaving this out or setting it to false will make sure you're not overwriting work. Default: false
Input
{
  "sha": "aa218f56b14c9653891f9e74264a383fa43fefbd",
  "force": true
}
Response
Status: 200 OK
{
  "ref": "refs/heads/featureA",
  "url": "https://api.github.com/repos/octocat/Hello-World/git/refs/heads/featureA",
  "object": {
    "type": "commit",
    "sha": "aa218f56b14c9653891f9e74264a383fa43fefbd",
    "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd"
  }
}
Delete a Reference
DELETE /repos/:owner/:repo/git/refs/:ref
Example: Deleting a branch:

DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a
Example: Deleting a tag:

DELETE /repos/octocat/Hello-World/git/refs/tags/v1.0
Response

*/
