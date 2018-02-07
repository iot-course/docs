const { asyncRequest } = require('./utils')


const deleteBranch = async (head) => {
  const { data } = await asyncRequest(
    `/repos/iot-course/org/git/refs/heads/${head}`,
  )
  console.log({ data })
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

  const { data } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    { commit_message: 'This robot has deemed you a worthy humanoid.' }
  )
  console.log({ data })

  // merged && deleteBranch(head)
}

const getPullNumber = async (head, message) => {
  const { data:pulls } = await asyncRequest(`/repos/iot-course/org/pulls?state=open&head=${head}`)
  const { number } = (pulls.filter( ({body}) => message === body )[0] || {})

  return number
    ? number
    : console.error('could not match pr body to commit msg');
}

exports.handler = async (e, _, cb) => {

  const {
    state,
    commit:{ commit:{ message } },
    branches: [{ name:head }]
  } = JSON.parse(e.body)



  if (state === 'success') {
    const pullNumber = await getPullNumber(head, message)
    pullNumber && mergePR(pullNumber, head)
  }

  if(state === 'failure'){
    closePR(pullNumber)
  }


  cb(null, { statusCode: 200 })

}
