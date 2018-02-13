/**
* Receives an email to pay dev for successful pull request
 * @summary λ statuses ⇒ λ pay ⇒ paypal
*/

exports.handler = ({ email}, _, cb) => {
  console.log(email,'-----event')
  cb(null, e)
}


/*
"has_pages": false,
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
"href": "https://api.github.com/repos/iot-course/org/pulls/176"
},
"html": {
"href": "https://github.com/iot-course/org/pull/176"
},
"issue": {
"href": "https://api.github.com/repos/iot-course/org/issues/176"
},
"comments": {
"href": "https://api.github.com/repos/iot-course/org/issues/176/comments"
},
"review_comments": {
"href": "https://api.github.com/repos/iot-course/org/pulls/176/comments"
},
"review_comment": {
"href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
},
"commits": {
"href": "https://api.github.com/repos/iot-course/org/pulls/176/commits"
},
"statuses": {
"href": "https://api.github.com/repos/iot-course/org/statuses/3501ac33f0003006b664753899da741dc0ac5438"
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
"commits": 3,
"additions": 74,
"deletions": 49,
"changed_files": 1
}
✨  Done in 3.45s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='setting up' yarn push
yarn run v1.3.2
warning ../../package.json: No license field
$ git add -A && git commit -m "$msg" && git push origin $(git rev-parse --abbrev-ref HEAD)
[Signup-and-Login 67662f2] setting up
1 file changed, 48 insertions(+), 88 deletions(-)
rewrite packages/crowdPay/lib/pay.js (79%)
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 889 bytes | 889.00 KiB/s, done.
Total 6 (delta 4), reused 0 (delta 0)
remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
To https://github.com/iot-course/org
3501ac3..67662f2  Signup-and-Login -> Signup-and-Login
✨  Done in 2.36s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='closes #1' yarn submit
yarn run v1.3.2
warning ../../package.json: No license field
$ curl -u $(git config user.name) -d '{ "title": "'$(git rev-parse --abbrev-ref HEAD)'", "head": "'$(git rev-parse --abbrev-ref HEAD)'", "base": "master", "body":"'"$msg"'"}' https://api.github.com/repos/iot-course/org/pulls
Enter host password for user 'wordyallen':
{
"url": "https://api.github.com/repos/iot-course/org/pulls/177",
"id": 168921425,
"html_url": "https://github.com/iot-course/org/pull/177",
"diff_url": "https://github.com/iot-course/org/pull/177.diff",
"patch_url": "https://github.com/iot-course/org/pull/177.patch",
"issue_url": "https://api.github.com/repos/iot-course/org/issues/177",
"number": 177,
"state": "open",
"locked": false,
"title": "Signup-and-Login",
"user": {
"login": "wordyallen",
"id": 4591833,
"avatar_url": "https://avatars1.githubusercontent.com/u/4591833?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/wordyallen",
"html_url": "https://github.com/wordyallen",
"followers_url": "https://api.github.com/users/wordyallen/followers",
"following_url": "https://api.github.com/users/wordyallen/following{/other_user}",
"gists_url": "https://api.github.com/users/wordyallen/gists{/gist_id}",
"starred_url": "https://api.github.com/users/wordyallen/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/wordyallen/subscriptions",
"organizations_url": "https://api.github.com/users/wordyallen/orgs",
"repos_url": "https://api.github.com/users/wordyallen/repos",
"events_url": "https://api.github.com/users/wordyallen/events{/privacy}",
"received_events_url": "https://api.github.com/users/wordyallen/received_events",
"type": "User",
"site_admin": false
},
"body": "closes #1",
"created_at": "2018-02-13T18:27:16Z",
"updated_at": "2018-02-13T18:27:16Z",
"closed_at": null,
"merged_at": null,
"merge_commit_sha": null,
"assignee": null,
"assignees": [

],
"requested_reviewers": [

],
"requested_teams": [

],
"labels": [

],
"milestone": null,
"commits_url": "https://api.github.com/repos/iot-course/org/pulls/177/commits",
"review_comments_url": "https://api.github.com/repos/iot-course/org/pulls/177/comments",
"review_comment_url": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}",
"comments_url": "https://api.github.com/repos/iot-course/org/issues/177/comments",
"statuses_url": "https://api.github.com/repos/iot-course/org/statuses/67662f2d6517d43e8915efc7e597a9f65d4ab769",
"head": {
"label": "iot-course:Signup-and-Login",
"ref": "Signup-and-Login",
"sha": "67662f2d6517d43e8915efc7e597a9f65d4ab769",
"user": {
"login": "iot-course",
"id": 35547533,
"avatar_url": "https://avatars2.githubusercontent.com/u/35547533?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/iot-course",
"html_url": "https://github.com/iot-course",
"followers_url": "https://api.github.com/users/iot-course/followers",
"following_url": "https://api.github.com/users/iot-course/following{/other_user}",
"gists_url": "https://api.github.com/users/iot-course/gists{/gist_id}",
"starred_url": "https://api.github.com/users/iot-course/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/iot-course/subscriptions",
"organizations_url": "https://api.github.com/users/iot-course/orgs",
"repos_url": "https://api.github.com/users/iot-course/repos",
"events_url": "https://api.github.com/users/iot-course/events{/privacy}",
"received_events_url": "https://api.github.com/users/iot-course/received_events",
"type": "Organization",
"site_admin": false
},
"repo": {
"id": 117913227,
"name": "org",
"full_name": "iot-course/org",
"owner": {
  "login": "iot-course",
  "id": 35547533,
  "avatar_url": "https://avatars2.githubusercontent.com/u/35547533?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/iot-course",
  "html_url": "https://github.com/iot-course",
  "followers_url": "https://api.github.com/users/iot-course/followers",
  "following_url": "https://api.github.com/users/iot-course/following{/other_user}",
  "gists_url": "https://api.github.com/users/iot-course/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/iot-course/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/iot-course/subscriptions",
  "organizations_url": "https://api.github.com/users/iot-course/orgs",
  "repos_url": "https://api.github.com/users/iot-course/repos",
  "events_url": "https://api.github.com/users/iot-course/events{/privacy}",
  "received_events_url": "https://api.github.com/users/iot-course/received_events",
  "type": "Organization",
  "site_admin": false
},
"private": false,
"html_url": "https://github.com/iot-course/org",
"description": "Main wiki,  developer support monorepo and product features 👀 ",
"fork": false,
"url": "https://api.github.com/repos/iot-course/org",
"forks_url": "https://api.github.com/repos/iot-course/org/forks",
"keys_url": "https://api.github.com/repos/iot-course/org/keys{/key_id}",
"collaborators_url": "https://api.github.com/repos/iot-course/org/collaborators{/collaborator}",
"teams_url": "https://api.github.com/repos/iot-course/org/teams",
"hooks_url": "https://api.github.com/repos/iot-course/org/hooks",
"issue_events_url": "https://api.github.com/repos/iot-course/org/issues/events{/number}",
"events_url": "https://api.github.com/repos/iot-course/org/events",
"assignees_url": "https://api.github.com/repos/iot-course/org/assignees{/user}",
"branches_url": "https://api.github.com/repos/iot-course/org/branches{/branch}",
"tags_url": "https://api.github.com/repos/iot-course/org/tags",
"blobs_url": "https://api.github.com/repos/iot-course/org/git/blobs{/sha}",
"git_tags_url": "https://api.github.com/repos/iot-course/org/git/tags{/sha}",
"git_refs_url": "https://api.github.com/repos/iot-course/org/git/refs{/sha}",
"trees_url": "https://api.github.com/repos/iot-course/org/git/trees{/sha}",
"statuses_url": "https://api.github.com/repos/iot-course/org/statuses/{sha}",
"languages_url": "https://api.github.com/repos/iot-course/org/languages",
"stargazers_url": "https://api.github.com/repos/iot-course/org/stargazers",
"contributors_url": "https://api.github.com/repos/iot-course/org/contributors",
"subscribers_url": "https://api.github.com/repos/iot-course/org/subscribers",
"subscription_url": "https://api.github.com/repos/iot-course/org/subscription",
"commits_url": "https://api.github.com/repos/iot-course/org/commits{/sha}",
"git_commits_url": "https://api.github.com/repos/iot-course/org/git/commits{/sha}",
"comments_url": "https://api.github.com/repos/iot-course/org/comments{/number}",
"issue_comment_url": "https://api.github.com/repos/iot-course/org/issues/comments{/number}",
"contents_url": "https://api.github.com/repos/iot-course/org/contents/{+path}",
"compare_url": "https://api.github.com/repos/iot-course/org/compare/{base}...{head}",
"merges_url": "https://api.github.com/repos/iot-course/org/merges",
"archive_url": "https://api.github.com/repos/iot-course/org/{archive_format}{/ref}",
"downloads_url": "https://api.github.com/repos/iot-course/org/downloads",
"issues_url": "https://api.github.com/repos/iot-course/org/issues{/number}",
"pulls_url": "https://api.github.com/repos/iot-course/org/pulls{/number}",
"milestones_url": "https://api.github.com/repos/iot-course/org/milestones{/number}",
"notifications_url": "https://api.github.com/repos/iot-course/org/notifications{?since,all,participating}",
"labels_url": "https://api.github.com/repos/iot-course/org/labels{/name}",
"releases_url": "https://api.github.com/repos/iot-course/org/releases{/id}",
"deployments_url": "https://api.github.com/repos/iot-course/org/deployments",
"created_at": "2018-01-18T01:11:55Z",
"updated_at": "2018-02-03T16:39:49Z",
"pushed_at": "2018-02-13T18:26:35Z",
"git_url": "git://github.com/iot-course/org.git",
"ssh_url": "git@github.com:iot-course/org.git",
"clone_url": "https://github.com/iot-course/org.git",
"svn_url": "https://github.com/iot-course/org",
"homepage": "",
"size": 1019,
"stargazers_count": 0,
"watchers_count": 0,
"language": "JavaScript",
"has_issues": true,
"has_projects": true,
"has_downloads": true,
"has_wiki": true,
"has_pages": false,
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
"base": {
"label": "iot-course:master",
"ref": "master",
"sha": "a21601775fd991f29333f00e9f8e063ec6f3dcde",
"user": {
"login": "iot-course",
"id": 35547533,
"avatar_url": "https://avatars2.githubusercontent.com/u/35547533?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/iot-course",
"html_url": "https://github.com/iot-course",
"followers_url": "https://api.github.com/users/iot-course/followers",
"following_url": "https://api.github.com/users/iot-course/following{/other_user}",
"gists_url": "https://api.github.com/users/iot-course/gists{/gist_id}",
"starred_url": "https://api.github.com/users/iot-course/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/iot-course/subscriptions",
"organizations_url": "https://api.github.com/users/iot-course/orgs",
"repos_url": "https://api.github.com/users/iot-course/repos",
"events_url": "https://api.github.com/users/iot-course/events{/privacy}",
"received_events_url": "https://api.github.com/users/iot-course/received_events",
"type": "Organization",
"site_admin": false
},
"repo": {
"id": 117913227,
"name": "org",
"full_name": "iot-course/org",
"owner": {
  "login": "iot-course",
  "id": 35547533,
  "avatar_url": "https://avatars2.githubusercontent.com/u/35547533?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/iot-course",
  "html_url": "https://github.com/iot-course",
  "followers_url": "https://api.github.com/users/iot-course/followers",
  "following_url": "https://api.github.com/users/iot-course/following{/other_user}",
  "gists_url": "https://api.github.com/users/iot-course/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/iot-course/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/iot-course/subscriptions",
  "organizations_url": "https://api.github.com/users/iot-course/orgs",
  "repos_url": "https://api.github.com/users/iot-course/repos",
  "events_url": "https://api.github.com/users/iot-course/events{/privacy}",
  "received_events_url": "https://api.github.com/users/iot-course/received_events",
  "type": "Organization",
  "site_admin": false
},
"private": false,
"html_url": "https://github.com/iot-course/org",
"description": "Main wiki,  developer support monorepo and product features 👀 ",
"fork": false,
"url": "https://api.github.com/repos/iot-course/org",
"forks_url": "https://api.github.com/repos/iot-course/org/forks",
"keys_url": "https://api.github.com/repos/iot-course/org/keys{/key_id}",
"collaborators_url": "https://api.github.com/repos/iot-course/org/collaborators{/collaborator}",
"teams_url": "https://api.github.com/repos/iot-course/org/teams",
"hooks_url": "https://api.github.com/repos/iot-course/org/hooks",
"issue_events_url": "https://api.github.com/repos/iot-course/org/issues/events{/number}",
"events_url": "https://api.github.com/repos/iot-course/org/events",
"assignees_url": "https://api.github.com/repos/iot-course/org/assignees{/user}",
"branches_url": "https://api.github.com/repos/iot-course/org/branches{/branch}",
"tags_url": "https://api.github.com/repos/iot-course/org/tags",
"blobs_url": "https://api.github.com/repos/iot-course/org/git/blobs{/sha}",
"git_tags_url": "https://api.github.com/repos/iot-course/org/git/tags{/sha}",
"git_refs_url": "https://api.github.com/repos/iot-course/org/git/refs{/sha}",
"trees_url": "https://api.github.com/repos/iot-course/org/git/trees{/sha}",
"statuses_url": "https://api.github.com/repos/iot-course/org/statuses/{sha}",
"languages_url": "https://api.github.com/repos/iot-course/org/languages",
"stargazers_url": "https://api.github.com/repos/iot-course/org/stargazers",
"contributors_url": "https://api.github.com/repos/iot-course/org/contributors",
"subscribers_url": "https://api.github.com/repos/iot-course/org/subscribers",
"subscription_url": "https://api.github.com/repos/iot-course/org/subscription",
"commits_url": "https://api.github.com/repos/iot-course/org/commits{/sha}",
"git_commits_url": "https://api.github.com/repos/iot-course/org/git/commits{/sha}",
"comments_url": "https://api.github.com/repos/iot-course/org/comments{/number}",
"issue_comment_url": "https://api.github.com/repos/iot-course/org/issues/comments{/number}",
"contents_url": "https://api.github.com/repos/iot-course/org/contents/{+path}",
"compare_url": "https://api.github.com/repos/iot-course/org/compare/{base}...{head}",
"merges_url": "https://api.github.com/repos/iot-course/org/merges",
"archive_url": "https://api.github.com/repos/iot-course/org/{archive_format}{/ref}",
"downloads_url": "https://api.github.com/repos/iot-course/org/downloads",
"issues_url": "https://api.github.com/repos/iot-course/org/issues{/number}",
"pulls_url": "https://api.github.com/repos/iot-course/org/pulls{/number}",
"milestones_url": "https://api.github.com/repos/iot-course/org/milestones{/number}",
"notifications_url": "https://api.github.com/repos/iot-course/org/notifications{?since,all,participating}",
"labels_url": "https://api.github.com/repos/iot-course/org/labels{/name}",
"releases_url": "https://api.github.com/repos/iot-course/org/releases{/id}",
"deployments_url": "https://api.github.com/repos/iot-course/org/deployments",
"created_at": "2018-01-18T01:11:55Z",
"updated_at": "2018-02-03T16:39:49Z",
"pushed_at": "2018-02-13T18:26:35Z",
"git_url": "git://github.com/iot-course/org.git",
"ssh_url": "git@github.com:iot-course/org.git",
"clone_url": "https://github.com/iot-course/org.git",
"svn_url": "https://github.com/iot-course/org",
"homepage": "",
"size": 1019,
"stargazers_count": 0,
"watchers_count": 0,
"language": "JavaScript",
"has_issues": true,
"has_projects": true,
"has_downloads": true,
"has_wiki": true,
"has_pages": false,
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
"href": "https://api.github.com/repos/iot-course/org/pulls/177"
},
"html": {
"href": "https://github.com/iot-course/org/pull/177"
},
"issue": {
"href": "https://api.github.com/repos/iot-course/org/issues/177"
},
"comments": {
"href": "https://api.github.com/repos/iot-course/org/issues/177/comments"
},
"review_comments": {
"href": "https://api.github.com/repos/iot-course/org/pulls/177/comments"
},
"review_comment": {
"href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
},
"commits": {
"href": "https://api.github.com/repos/iot-course/org/pulls/177/commits"
},
"statuses": {
"href": "https://api.github.com/repos/iot-course/org/statuses/67662f2d6517d43e8915efc7e597a9f65d4ab769"
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
"additions": 34,
"deletions": 49,
"changed_files": 1
}
✨  Done in 3.05s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ atom .

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ git pull origin master
From https://github.com/iot-course/org
* branch            master     -> FETCH_HEAD
Already up-to-date!
Merge made by the 'recursive' strategy.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='setting up' yarn push
yarn run v1.3.2
warning ../../package.json: No license field
$ git add -A && git commit -m "$msg" && git push origin $(git rev-parse --abbrev-ref HEAD)
[Signup-and-Login e3e1148] setting up
1 file changed, 22 insertions(+), 22 deletions(-)
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (7/7), done.
Writing objects: 100% (7/7), 1.19 KiB | 1.19 MiB/s, done.
Total 7 (delta 4), reused 0 (delta 0)
remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
To https://github.com/iot-course/org
67662f2..e3e1148  Signup-and-Login -> Signup-and-Login
✨  Done in 2.36s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='closes #1' yarn submit
yarn run v1.3.2
warning ../../package.json: No license field
$ curl -u $(git config user.name) -d '{ "title": "'$(git rev-parse --abbrev-ref HEAD)'", "head": "'$(git rev-parse --abbrev-ref HEAD)'", "base": "master", "body":"'"$msg"'"}' https://api.github.com/repos/iot-course/org/pulls
Enter host password for user 'wordyallen':
{
"url": "https://api.github.com/repos/iot-course/org/pulls/178",
"id": 168924425,
"html_url": "https://github.com/iot-course/org/pull/178",
"diff_url": "https://github.com/iot-course/org/pull/178.diff",
"patch_url": "https://github.com/iot-course/org/pull/178.patch",
"issue_url": "https://api.github.com/repos/iot-course/org/issues/178",
"number": 178,
"state": "open",
"locked": false,
"title": "Signup-and-Login",
"user": {
"login": "wordyallen",
"id": 4591833,
"avatar_url": "https://avatars1.githubusercontent.com/u/4591833?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/wordyallen",
"html_url": "https://github.com/wordyallen",
"followers_url": "https://api.github.com/users/wordyallen/followers",
"following_url": "https://api.github.com/users/wordyallen/following{/other_user}",
"gists_url": "https://api.github.com/users/wordyallen/gists{/gist_id}",
"starred_url": "https://api.github.com/users/wordyallen/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/wordyallen/subscriptions",
"organizations_url": "https://api.github.com/users/wordyallen/orgs",
"repos_url": "https://api.github.com/users/wordyallen/repos",
"events_url": "https://api.github.com/users/wordyallen/events{/privacy}",
"received_events_url": "https://api.github.com/users/wordyallen/received_events",
"type": "User",
"site_admin": false
},
"body": "closes #1",
"created_at": "2018-02-13T18:41:27Z",
"updated_at": "2018-02-13T18:41:27Z",
"closed_at": null,
"merged_at": null,
"merge_commit_sha": null,
"assignee": null,
"assignees": [

],
"requested_reviewers": [

],
"requested_teams": [

],
"labels": [

],
"milestone": null,
"commits_url": "https://api.github.com/repos/iot-course/org/pulls/178/commits",
"review_comments_url": "https://api.github.com/repos/iot-course/org/pulls/178/comments",
"review_comment_url": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}",
"comments_url": "https://api.github.com/repos/iot-course/org/issues/178/comments",
"statuses_url": "https://api.github.com/repos/iot-course/org/statuses/e3e11485794a65e5f2354b59f19ec080f433bc1f",
"head": {
"label": "iot-course:Signup-and-Login",
"ref": "Signup-and-Login",
"sha": "e3e11485794a65e5f2354b59f19ec080f433bc1f",
"user": {
"login": "iot-course",
"id": 35547533,
"avatar_url": "https://avatars2.githubusercontent.com/u/35547533?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/iot-course",
"html_url": "https://github.com/iot-course",
"followers_url": "https://api.github.com/users/iot-course/followers",
"following_url": "https://api.github.com/users/iot-course/following{/other_user}",
"gists_url": "https://api.github.com/users/iot-course/gists{/gist_id}",
"starred_url": "https://api.github.com/users/iot-course/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/iot-course/subscriptions",
"organizations_url": "https://api.github.com/users/iot-course/orgs",
"repos_url": "https://api.github.com/users/iot-course/repos",
"events_url": "https://api.github.com/users/iot-course/events{/privacy}",
"received_events_url": "https://api.github.com/users/iot-course/received_events",
"type": "Organization",
"site_admin": false
},
"repo": {
"id": 117913227,
"name": "org",
"full_name": "iot-course/org",
"owner": {
  "login": "iot-course",
  "id": 35547533,
  "avatar_url": "https://avatars2.githubusercontent.com/u/35547533?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/iot-course",
  "html_url": "https://github.com/iot-course",
  "followers_url": "https://api.github.com/users/iot-course/followers",
  "following_url": "https://api.github.com/users/iot-course/following{/other_user}",
  "gists_url": "https://api.github.com/users/iot-course/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/iot-course/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/iot-course/subscriptions",
  "organizations_url": "https://api.github.com/users/iot-course/orgs",
  "repos_url": "https://api.github.com/users/iot-course/repos",
  "events_url": "https://api.github.com/users/iot-course/events{/privacy}",
  "received_events_url": "https://api.github.com/users/iot-course/received_events",
  "type": "Organization",
  "site_admin": false
},
"private": false,
"html_url": "https://github.com/iot-course/org",
"description": "Main wiki,  developer support monorepo and product features 👀 ",
"fork": false,
"url": "https://api.github.com/repos/iot-course/org",
"forks_url": "https://api.github.com/repos/iot-course/org/forks",
"keys_url": "https://api.github.com/repos/iot-course/org/keys{/key_id}",
"collaborators_url": "https://api.github.com/repos/iot-course/org/collaborators{/collaborator}",
"teams_url": "https://api.github.com/repos/iot-course/org/teams",
"hooks_url": "https://api.github.com/repos/iot-course/org/hooks",
"issue_events_url": "https://api.github.com/repos/iot-course/org/issues/events{/number}",
"events_url": "https://api.github.com/repos/iot-course/org/events",
"assignees_url": "https://api.github.com/repos/iot-course/org/assignees{/user}",
"branches_url": "https://api.github.com/repos/iot-course/org/branches{/branch}",
"tags_url": "https://api.github.com/repos/iot-course/org/tags",
"blobs_url": "https://api.github.com/repos/iot-course/org/git/blobs{/sha}",
"git_tags_url": "https://api.github.com/repos/iot-course/org/git/tags{/sha}",
"git_refs_url": "https://api.github.com/repos/iot-course/org/git/refs{/sha}",
"trees_url": "https://api.github.com/repos/iot-course/org/git/trees{/sha}",
"statuses_url": "https://api.github.com/repos/iot-course/org/statuses/{sha}",
"languages_url": "https://api.github.com/repos/iot-course/org/languages",
"stargazers_url": "https://api.github.com/repos/iot-course/org/stargazers",
"contributors_url": "https://api.github.com/repos/iot-course/org/contributors",
"subscribers_url": "https://api.github.com/repos/iot-course/org/subscribers",
"subscription_url": "https://api.github.com/repos/iot-course/org/subscription",
"commits_url": "https://api.github.com/repos/iot-course/org/commits{/sha}",
"git_commits_url": "https://api.github.com/repos/iot-course/org/git/commits{/sha}",
"comments_url": "https://api.github.com/repos/iot-course/org/comments{/number}",
"issue_comment_url": "https://api.github.com/repos/iot-course/org/issues/comments{/number}",
"contents_url": "https://api.github.com/repos/iot-course/org/contents/{+path}",
"compare_url": "https://api.github.com/repos/iot-course/org/compare/{base}...{head}",
"merges_url": "https://api.github.com/repos/iot-course/org/merges",
"archive_url": "https://api.github.com/repos/iot-course/org/{archive_format}{/ref}",
"downloads_url": "https://api.github.com/repos/iot-course/org/downloads",
"issues_url": "https://api.github.com/repos/iot-course/org/issues{/number}",
"pulls_url": "https://api.github.com/repos/iot-course/org/pulls{/number}",
"milestones_url": "https://api.github.com/repos/iot-course/org/milestones{/number}",
"notifications_url": "https://api.github.com/repos/iot-course/org/notifications{?since,all,participating}",
"labels_url": "https://api.github.com/repos/iot-course/org/labels{/name}",
"releases_url": "https://api.github.com/repos/iot-course/org/releases{/id}",
"deployments_url": "https://api.github.com/repos/iot-course/org/deployments",
"created_at": "2018-01-18T01:11:55Z",
"updated_at": "2018-02-03T16:39:49Z",
"pushed_at": "2018-02-13T18:40:31Z",
"git_url": "git://github.com/iot-course/org.git",
"ssh_url": "git@github.com:iot-course/org.git",
"clone_url": "https://github.com/iot-course/org.git",
"svn_url": "https://github.com/iot-course/org",
"homepage": "",
"size": 1019,
"stargazers_count": 0,
"watchers_count": 0,
"language": "JavaScript",
"has_issues": true,
"has_projects": true,
"has_downloads": true,
"has_wiki": true,
"has_pages": false,
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
"base": {
"label": "iot-course:master",
"ref": "master",
"sha": "94147088c566669f101f19ae10f89c1b03d20e1b",
"user": {
"login": "iot-course",
"id": 35547533,
"avatar_url": "https://avatars2.githubusercontent.com/u/35547533?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/iot-course",
"html_url": "https://github.com/iot-course",
"followers_url": "https://api.github.com/users/iot-course/followers",
"following_url": "https://api.github.com/users/iot-course/following{/other_user}",
"gists_url": "https://api.github.com/users/iot-course/gists{/gist_id}",
"starred_url": "https://api.github.com/users/iot-course/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/iot-course/subscriptions",
"organizations_url": "https://api.github.com/users/iot-course/orgs",
"repos_url": "https://api.github.com/users/iot-course/repos",
"events_url": "https://api.github.com/users/iot-course/events{/privacy}",
"received_events_url": "https://api.github.com/users/iot-course/received_events",
"type": "Organization",
"site_admin": false
},
"repo": {
"id": 117913227,
"name": "org",
"full_name": "iot-course/org",
"owner": {
  "login": "iot-course",
  "id": 35547533,
  "avatar_url": "https://avatars2.githubusercontent.com/u/35547533?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/iot-course",
  "html_url": "https://github.com/iot-course",
  "followers_url": "https://api.github.com/users/iot-course/followers",
  "following_url": "https://api.github.com/users/iot-course/following{/other_user}",
  "gists_url": "https://api.github.com/users/iot-course/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/iot-course/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/iot-course/subscriptions",
  "organizations_url": "https://api.github.com/users/iot-course/orgs",
  "repos_url": "https://api.github.com/users/iot-course/repos",
  "events_url": "https://api.github.com/users/iot-course/events{/privacy}",
  "received_events_url": "https://api.github.com/users/iot-course/received_events",
  "type": "Organization",
  "site_admin": false
},
"private": false,
"html_url": "https://github.com/iot-course/org",
"description": "Main wiki,  developer support monorepo and product features 👀 ",
"fork": false,
"url": "https://api.github.com/repos/iot-course/org",
"forks_url": "https://api.github.com/repos/iot-course/org/forks",
"keys_url": "https://api.github.com/repos/iot-course/org/keys{/key_id}",
"collaborators_url": "https://api.github.com/repos/iot-course/org/collaborators{/collaborator}",
"teams_url": "https://api.github.com/repos/iot-course/org/teams",
"hooks_url": "https://api.github.com/repos/iot-course/org/hooks",
"issue_events_url": "https://api.github.com/repos/iot-course/org/issues/events{/number}",
"events_url": "https://api.github.com/repos/iot-course/org/events",
"assignees_url": "https://api.github.com/repos/iot-course/org/assignees{/user}",
"branches_url": "https://api.github.com/repos/iot-course/org/branches{/branch}",
"tags_url": "https://api.github.com/repos/iot-course/org/tags",
"blobs_url": "https://api.github.com/repos/iot-course/org/git/blobs{/sha}",
"git_tags_url": "https://api.github.com/repos/iot-course/org/git/tags{/sha}",
"git_refs_url": "https://api.github.com/repos/iot-course/org/git/refs{/sha}",
"trees_url": "https://api.github.com/repos/iot-course/org/git/trees{/sha}",
"statuses_url": "https://api.github.com/repos/iot-course/org/statuses/{sha}",
"languages_url": "https://api.github.com/repos/iot-course/org/languages",
"stargazers_url": "https://api.github.com/repos/iot-course/org/stargazers",
"contributors_url": "https://api.github.com/repos/iot-course/org/contributors",
"subscribers_url": "https://api.github.com/repos/iot-course/org/subscribers",
"subscription_url": "https://api.github.com/repos/iot-course/org/subscription",
"commits_url": "https://api.github.com/repos/iot-course/org/commits{/sha}",
"git_commits_url": "https://api.github.com/repos/iot-course/org/git/commits{/sha}",
"comments_url": "https://api.github.com/repos/iot-course/org/comments{/number}",
"issue_comment_url": "https://api.github.com/repos/iot-course/org/issues/comments{/number}",
"contents_url": "https://api.github.com/repos/iot-course/org/contents/{+path}",
"compare_url": "https://api.github.com/repos/iot-course/org/compare/{base}...{head}",
"merges_url": "https://api.github.com/repos/iot-course/org/merges",
"archive_url": "https://api.github.com/repos/iot-course/org/{archive_format}{/ref}",
"downloads_url": "https://api.github.com/repos/iot-course/org/downloads",
"issues_url": "https://api.github.com/repos/iot-course/org/issues{/number}",
"pulls_url": "https://api.github.com/repos/iot-course/org/pulls{/number}",
"milestones_url": "https://api.github.com/repos/iot-course/org/milestones{/number}",
"notifications_url": "https://api.github.com/repos/iot-course/org/notifications{?since,all,participating}",
"labels_url": "https://api.github.com/repos/iot-course/org/labels{/name}",
"releases_url": "https://api.github.com/repos/iot-course/org/releases{/id}",
"deployments_url": "https://api.github.com/repos/iot-course/org/deployments",
"created_at": "2018-01-18T01:11:55Z",
"updated_at": "2018-02-03T16:39:49Z",
"pushed_at": "2018-02-13T18:40:31Z",
"git_url": "git://github.com/iot-course/org.git",
"ssh_url": "git@github.com:iot-course/org.git",
"clone_url": "https://github.com/iot-course/org.git",
"svn_url": "https://github.com/iot-course/org",
"homepage": "",
"size": 1019,
"stargazers_count": 0,
"watchers_count": 0,
"language": "JavaScript",
"has_issues": true,
"has_projects": true,
"has_downloads": true,
"has_wiki": true,
"has_pages": false,
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
"href": "https://api.github.com/repos/iot-course/org/pulls/178"
},
"html": {
"href": "https://github.com/iot-course/org/pull/178"
},
"issue": {
"href": "https://api.github.com/repos/iot-course/org/issues/178"
},
"comments": {
"href": "https://api.github.com/repos/iot-course/org/issues/178/comments"
},
"review_comments": {
"href": "https://api.github.com/repos/iot-course/org/pulls/178/comments"
},
"review_comment": {
"href": "https://api.github.com/repos/iot-course/org/pulls/comments{/number}"
},
"commits": {
"href": "https://api.github.com/repos/iot-course/org/pulls/178/commits"
},
"statuses": {
"href": "https://api.github.com/repos/iot-course/org/statuses/e3e11485794a65e5f2354b59f19ec080f433bc1f"
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
"additions": 22,
"deletions": 22,
"changed_files": 1
}
✨  Done in 3.25s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='closes #1' yarn submit
yarn run v1.3.2
warning ../../package.json: No license field
$ curl -u $(git config user.name) -d '{ "title": "'$(git rev-parse --abbrev-ref HEAD)'", "head": "'$(git rev-parse --abbrev-ref HEAD)'", "base": "master", "body":"'"$msg"'"}' https://api.github.com/repos/iot-course/org/pulls
Enter host password for user 'wordyallen':

~/Build/iot-course/org/packages/crowdPay Signup-and-Login*
❯ msg='setting up' yarn push
yarn run v1.3.2
warning ../../package.json: No license field
$ git add -A && git commit -m "$msg" && git push origin $(git rev-parse --abbrev-ref HEAD)
[Signup-and-Login ea3877b] setting up
1 file changed, 48 insertions(+), 7 deletions(-)
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 1.35 KiB | 1.35 MiB/s, done.
Total 6 (delta 4), reused 0 (delta 0)
remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
^LTo https://github.com/iot-course/org
e3e1148..ea3877b  Signup-and-Login -> Signup-and-Login
✨  Done in 2.34s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login*
❯

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='setting up' yarn push
yarn run v1.3.2
warning ../../package.json: No license field
$ git add -A && git commit -m "$msg" && git push origin $(git rev-parse --abbrev-ref HEAD)
On branch Signup-and-Login
nothing to commit, working tree clean
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='setting up' yarn push
yarn run v1.3.2
warning ../../package.json: No license field
$ git add -A && git commit -m "$msg" && git push origin $(git rev-parse --abbrev-ref HEAD)
On branch Signup-and-Login
nothing to commit, working tree clean
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯ msg='setting up' yarn push
yarn run v1.3.2
warning ../../package.json: No license field
$ git add -A && git commit -m "$msg" && git push origin $(git rev-parse --abbrev-ref HEAD)
[Signup-and-Login dd8e25e] setting up
1 file changed, 15 insertions(+), 89 deletions(-)
rewrite packages/crowdPay/lib/pay.js (87%)
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 477 bytes | 477.00 KiB/s, done.
Total 6 (delta 5), reused 0 (delta 0)
remote: Resolving deltas: 100% (5/5), completed with 5 local objects.
To https://github.com/iot-course/org
ea3877b..dd8e25e  Signup-and-Login -> Signup-and-Login
✨  Done in 2.38s.

~/Build/iot-course/org/packages/crowdPay Signup-and-Login
❯

*/
