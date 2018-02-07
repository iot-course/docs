exports.handler = (e, _, cb) => {

/* eslint-disable camelcase */
  const {
    state
  } = JSON.parse(e.body)
/* eslint-enable */

  console.log('state', state)
  cb(null, {statusCode: 200})
}
