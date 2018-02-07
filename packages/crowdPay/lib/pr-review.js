exports.handler = (e, _, cb) => {

/* eslint-disable camelcase */
  const {
    action
  } = JSON.parse(e.body)
/* eslint-enable */

  console.log('actions', action)
  cb(null, {statusCode: 200})
}
