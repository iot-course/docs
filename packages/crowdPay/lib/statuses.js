const { asyncRequest } = require('./utils')

const closePR = async (pullNumber, message, success) => {

   await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}`,
    'patch',
    {
      state: "closed",
      body: success
        ? `${message} \n\n> Crispy Lettuce 💵 😎  (added automagically)`
        : `${message} \n\n> This robot has deemed you unworthy 🤖 💥 😭 `
    }
  )
}


const mergePR = async (pullNumber, head) => {

  await asyncRequest(
    `/repos/iot-course/org/pulls/${pullNumber}/merge`,
    'put',
    {commit_message: 'all gravy'}
  )
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
    closePR(pullNumber, message, true)
  }

  if(state === 'failure'){
    const pullNumber = await getPullNumber(branch)
    closePR(pullNumber, message)
  }


  cb(null, { statusCode: 200 })

}

/*
18:36  error    'head' is defined but never used                                  no-unused-vars
23:5   error    A space is required after '{'                                     object-curly-spacing
23:33  error    A space is required before '}'                                    object-curly-spacing
30:3   warning  Unexpected console statement                                      no-console
30:15  error    A space is required after '{'                                     object-curly-spacing
30:21  error    A space is required before '}'                                    object-curly-spacing
31:38  error    A space is required after '{'                                     object-curly-spacing
31:43  error    A space is required before '}'                                    object-curly-spacing
34:7   error    Unnecessary use of conditional expression for default assignment  no-unneeded-ternary
35:7   warning  Unexpected console statement                                      no-console
47:3   warning  Unexpected console statement                                      no-console
47:31  error    A space is required before '}'                                    object-curly-spacing
55:3   error    Expected space(s) after "if"                                      keyword-spacing
55:26  error    Missing space before opening brace                                space-before-blocks

✖ 15 problems (12 errors, 3 warnings)
11 errors, 0 warnings potentially fixable with the `--fix` option.

Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...

*/
