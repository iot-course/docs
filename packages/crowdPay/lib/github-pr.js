exports.handler = (e, _, cb) => {

/* eslint-disable camelcase */
  const {
    action,
    number,
    pull_request:{
      title,
      user:{ login },
      merge_commit_sha,
      assignee,
      milestone,
      commits_url,
      statuses_url,
      head:{ label:headlabel, ref:headref, sha:headsha },
      base: { label:baselabel, ref:baseref, sha:basesha },
      merged,
      mergeable,
      mergeable_state,
      merged_by,
      additions,
      deletions
    }
  } = JSON.parse(e.body)
/* eslint-enable */

  const data = {
    action,
    number,
    pull_request:{
      title,
      user:{ login },
      merge_commit_sha,
      assignee,
      milestone,
      commits_url,
      statuses_url,
      head:{ headlabel, headref, headsha },
      base: { baselabel, baseref, basesha },
      merged,
      mergeable,
      mergeable_state,
      merged_by,
      additions,
      deletions
    }
  }
  console.log(data)
  cb(null, data)

}
