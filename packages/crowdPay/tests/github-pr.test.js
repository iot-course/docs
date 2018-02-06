const { handler: githubPullRequest } = require('../lib/github-pr')
const { createEvent } = require('./utils')

test('should return 200 from status check',  done =>{

  const event = { body: JSON.stringify({
    "action": "opened",
    "number": 1,
    "pull_request": {
      "user": {
        "login": "baxterthehacker",
      },
      "merge_commit_sha": null,
      "assignee": null,
      "commits_url": "https://api.github.com/repos/baxterthehacker/public-repo/pulls/1/commits",
      "statuses_url": "https://api.github.com/repos/baxterthehacker/public-repo/statuses/0d1a26e67d8f5eaf1f6ba5c57fc3c7d91ac0fd1c",
      "head": {
        "label": "baxterthehacker:changes",
        "ref": "changes",
        "sha": "0d1a26e67d8f5eaf1f6ba5c57fc3c7d91ac0fd1c",
      },
      "base": {
        "label": "baxterthehacker:master",
        "ref": "master",
        "sha": "9049f1265b7d61be4a8904a9a27120d2064dab3b",
      },
      "merged": false,
      "mergeable": null,
      "mergeable_state": "unknown",
      "merged_by": null,
      "additions": 1,
      "deletions": 1,
    }
  })}


  githubPullRequest(event, null, (err, { statusCode } )=>{
    expect(statusCode).toBe(200)
    done()
  })

})