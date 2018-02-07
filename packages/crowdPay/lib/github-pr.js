const { asyncRequest } = require('./utils')

exports.handler = (e, _, cb) => {

/* eslint-disable camelcase */
  const {
    action,
    pull_request:{
      head:{
        sha
      },
      additions,
      deletions
    }
  } = JSON.parse(e.body)
/* eslint-enable */
  const getStatus = async cb => {
    const {err, data} = await asyncRequest(`/repos/iot-course/org/statuses/${sha}`)
    data ? cb(null, data ) : cb(err)
  }

  setTimeOut( getStatus(cb), 2000)

  cb(null, { statusCode : 200 })
}


//{"title":"Some breaking feature","head":"check-changes-of-commit","base":"master", "body":"close #1"}
