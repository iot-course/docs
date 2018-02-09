/**
* Receives an email to pay dev for successful pull request
 * @summary λ statuses ⇒ λ pay ⇒ paypal
*/

exports.handler = (e, _, cb) => {
  console.log(e,'-----event')
  cb(null, e)
}
