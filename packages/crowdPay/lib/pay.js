/**
* Receives an email to pay dev for successful pull request
 * @summary λ statuses ⇒ λ pay ⇒ paypal
*/

exports.handler = ({ email}, _, cb) => {
  console.log(email,'-----event')
  cb(null, e)
}


/*
"href": "https://api.github.com/repos/iot-course/org/issues/174"
},
"comments": {
"href": "https://api.github.com/repos/iot-course/org/issues/174/comments"
},
"review_comments": {
"href": "https://api.github.com/repos/iot-course/org/pulls/174/comments"
},
"review_comment": {
"href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
},
"commits": {
"href": "https://api.github.com/repos/iot-course/org/pulls/174/commits"
},
"statuses": {
"href": "https://api.github.com/repos/iot-course/org/statuses/f9f45251141128a7ccd8c0d31d6066a2a7b9feac"
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
"commits": 4,
"additions": 49,
"deletions": 212,
"changed_files": 1
}
✨  Done in 3.11s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ git pull origin master
remote: Counting objects: 1, done.
remote: Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (1/1), done.
From https://github.com/iot-course/org
* branch            master     -> FETCH_HEAD
8d6a314..a216017  master     -> origin/master
Already up-to-date!
Merge made by the 'recursive' strategy.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='closes #1' yarn submit
*/
