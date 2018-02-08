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
    InvocationType: 'RequestResponse',
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
lib/issues.js  6.51 kB       0  [emitted]  lib/issues
   [0] ./lib/issues.js 2.82 kB {0} [built]
   [1] ./lib/utils.js 861 bytes {0} [built]
   [2] external "https" 42 bytes {0} [not cacheable]
   [3] external "aws-sdk" 42 bytes {0} [not cacheable]
Time: 1161ms
               Asset     Size  Chunks             Chunk Names
lib/pull-requests.js  6.12 kB       0  [emitted]  lib/pull-requests
   [0] ./lib/pull-requests.js 2.53 kB {0} [built] [1 warning]
   [1] ./lib/utils.js 861 bytes {0} [built]
   [2] external "https" 42 bytes {0} [not cacheable]

WARNING in ./lib/pull-requests.js

/Users/joe/Build/iot-course/org/packages/crowdPay/lib/pull-requests.js
  53:3  warning  Unexpected console statement                                  no-console
  56:5  error    Expected exception block, space or tab after '//' in comment  spaced-comment
  58:5  warning  Unexpected console statement                                  no-console

✖ 3 problems (1 error, 2 warnings)
  1 error, 0 warnings potentially fixable with the `--fix` option.

Time: 1160ms
          Asset     Size  Chunks             Chunk Names
lib/statuses.js  6.47 kB       0  [emitted]  lib/statuses
   [0] ./lib/statuses.js 2.78 kB {0} [built] [1 warning]
   [1] external "aws-sdk" 42 bytes {0} [not cacheable]
   [2] ./lib/utils.js 861 bytes {0} [built]
   [3] external "https" 42 bytes {0} [not cacheable]

WARNING in ./lib/statuses.js

/Users/joe/Build/iot-course/org/packages/crowdPay/lib/statuses.js
  31:46  error    'body' is already declared in the upper scope  no-shadow
  35:7   warning  Unexpected console statement                   no-console

✖ 2 problems (1 error, 1 warning)

Time: 1159ms
     Asset     Size  Chunks             Chunk Names
lib/pay.js  2.73 kB       0  [emitted]  lib/pay
   [0] ./lib/pay.js 202 bytes {0} [built] [1 warning]

WARNING in ./lib/pay.js

/Users/joe/Build/iot-course/org/packages/crowdPay/lib/pay.js
  7:3  warning  Unexpected console statement  no-console

✖ 1 problem (0 errors, 1 warning)

Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...

*/
