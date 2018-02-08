/**
* Receives gh issue, then reverts or allows labels changes and issue closings based on auth
 * @summary λ  ⇒ λ github-issue ⇒ request
 * @external labelAction ? authLabelChange(number, cb) : closeAction && undoClose(number, cb)
 * @param { Object }  Item -  JSON.parse(event.body)
 * @param { Number }  number -  JSON.parse(event.body).issue
*/

exports.handler = (e, _, cb) => {
  console.log('pay has been called')
  cb(null, e)
}
