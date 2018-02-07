const { asyncRequest } = require('./utils')


const closePR = async (pullNumber, head, success) => {

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    {
      state: "closed",
      body: success
        ? `${head} \n\nCrispy Lettuce 💵 😎  — added automagically`
        : `${head} \n\nThis Robot has deemed you unworthy 🤖 💥 😭 — added automagically`
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


  if (state === 'success' && !message.startsWith("Merge")) {
    const pullNumber = await getPullNumber(head, message)
    pullNumber && mergePR(pullNumber, head)
  }

  if(state === 'failure'){
    closePR(pullNumber, head)
  }


  cb(null, { statusCode: 200 })

}

/*

 @wordyallen
Merge branch 'master' of https://github.com/iot-course/org into check…  …
709e01c
 @wordyallen
closes #1
9fac408
 @TA-Bot
TA-Bot approved these changes 40 seconds ago
Your code is adequate enough given the
limitations of your species.

 @TA-Bot TA-Bot merged commit 78583fe into master  11 seconds ago
1 check passed
Pull request successfully merged and closed

*/
