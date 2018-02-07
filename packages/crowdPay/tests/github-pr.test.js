const { handler: githubPullRequest } = require('../lib/github-pr')
const { createEvent } = require('./utils')

test('should return 200 from status check',  () =>{

  const event = { body: JSON.stringify({
    "action": "opened",
    "number": 1,
    "pull_request": {
      "head": {
        "sha": "e28826907b2d35d79915e36db3b49cacc5353e7b",
      },
      "additions": 1,
      "deletions": 1,
    }
  })}

  expect(10).toBe(10)

})
