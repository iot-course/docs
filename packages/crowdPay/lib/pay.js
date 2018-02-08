/**
* Receives an email to pay dev for successful pull request
 * @summary λ statuses ⇒ λ pay ⇒ paypal
*/

exports.handler = (e, _, cb) => {
  console.log(`pay this person ${e.body}`)
  cb(null, e)
}
