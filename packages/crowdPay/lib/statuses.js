const { asyncRequest } = require('./utils')


const deleteBranch = async ref => {
  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/git/refs/${ref}`,
    'delete',
  )

  statusCode && console.log({ deleteBranchCode: statusCode })
  return statusCode===200
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

  console.log({ state })

  if (state === 'success' && !message.startsWith("Merges")) {
    const pullNumber = await getPullNumber(branch);

    await mergePR(pullNumber, branch) &&
    await closePR(pullNumber, message) &&
    await deleteBranch(branch) &&
    console.log('merge successful')

  }

  if(state === 'failure'){
    const pullNumber = await getPullNumber(branch)
    closePR(pullNumber, message)
  }


  cb(null, { statusCode: 200 })

}

/*
never used  no-unused-vars
  39:10  warning  Unexpected console statement                     no-console
  51:7   error    'title' is assigned a value but never used       no-unused-vars
  54:1   error    More than 2 blank lines not allowed              no-multiple-empty-lines

✖ 5 problems (4 errors, 1 warning)
  2 errors, 0 warnings potentially fixable with the `--fix` option.

Time: 1118ms
          Asset     Size  Chunks             Chunk Names
lib/statuses.js  6.62 kB       0  [emitted]  lib/statuses
   [0] ./lib/statuses.js 3.03 kB {0} [built] [1 warning]
   [1] ./lib/utils.js 861 bytes {0} [built]
   [2] external "https" 42 bytes {0} [not cacheable]

WARNING in ./lib/statuses.js

/Users/joe/Build/iot-course/org/packages/crowdPay/lib/statuses.js
  10:17  warning  Unexpected console statement                                      no-console
  11:20  error    Infix operators must be spaced                                    space-infix-ops
  21:14  error    Strings must use singlequote                                      quotes
  22:13  error    'success' is not defined                                          no-undef
  28:20  error    Infix operators must be spaced                                    space-infix-ops
  32:36  error    'head' is defined but never used                                  no-unused-vars
  37:5   error    A space is required after '{'                                     object-curly-spacing
  37:33  error    A space is required before '}'                                    object-curly-spacing
  40:20  error    Infix operators must be spaced                                    space-infix-ops
  46:38  error    A space is required after '{'                                     object-curly-spacing
  46:43  error    A space is required before '}'                                    object-curly-spacing
  49:7   error    Unnecessary use of conditional expression for default assignment  no-unneeded-ternary
  50:7   warning  Unexpected console statement                                      no-console
  62:3   warning  Unexpected console statement                                      no-console
  64:50  error    Strings must use singlequote                                      quotes
  65:51  warning  Extra semicolon                                                   semi
  70:5   warning  Unexpected console statement                                      no-console
  74:3   error    Expected space(s) after "if"                                      keyword-spacing
  74:26  error    Missing space before opening brace                                space-before-blocks

✖ 19 problems (14 errors, 5 warnings)
  12 errors, 1 warning potentially fixable with the `--fix` option.

Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
*/
