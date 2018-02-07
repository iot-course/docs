exports.handler = (e, _, cb) => {

/* eslint-disable camelcase */
  const {
    action,
    pull_request:{
      body,
      statuses_url,
      additions,
      deletions
    }
  } = JSON.parse(e.body)
/* eslint-enable */

  const data = {
    action,
    pull_request:{
      body,
      statuses_url,
      additions,
      deletions
    }
  }
  console.log('data:',data )

  cb(null, { statusCode : 200 })
}


// {"title":"Some breaking feature","head":"check-changes-of-commit","base":"master", "body":"close #1"}
