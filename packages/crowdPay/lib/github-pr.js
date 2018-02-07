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

  const getStatus = async ()  => {
    const {err, data} = await asyncRequest(`/repos/iot-course/org/statuses/${sha}`)
      console.log( data[0]['state'])
      data ? cb(null, { statusCode: 200 } ) : cb(err)
  }

  setTimeout( getStatus , 2000)
}



//{"title":"Some breaking feature","head":"check-changes-of-commit","base":"master", "body":"close #1"}
