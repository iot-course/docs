/**
* Receives an email to pay dev for successful pull request
 * @summary λ statuses ⇒ λ pay ⇒ paypal
*/

exports.handler = ({ email}, _, cb) => {
  console.log(email,'-----event')
  cb(null, e)
}


/*

"forks_count": 0,
  "mirror_url": null,
  "archived": false,
  "open_issues_count": 3,
  "license": null,
  "forks": 0,
  "open_issues": 3,
  "watchers": 0,
  "default_branch": "master"
}
},
"_links": {
"self": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/173"
},
"html": {
  "href": "https://github.com/iot-course/org/pull/173"
},
"issue": {
  "href": "https://api.github.com/repos/iot-course/org/issues/173"
},
"comments": {
  "href": "https://api.github.com/repos/iot-course/org/issues/173/comments"
},
"review_comments": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/173/comments"
},
"review_comment": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
},
"commits": {
  "href": "https://api.github.com/repos/iot-course/org/pulls/173/commits"
},
"statuses": {
  "href": "https://api.github.com/repos/iot-course/org/statuses/7828c268b9610e116438e4e471096dd4fa06a8c8"
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
"commits": 2,
"additions": 0,
"deletions": 217,
*/
