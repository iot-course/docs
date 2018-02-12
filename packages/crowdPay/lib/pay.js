/**
* Receives an email to pay dev for successful pull request
 * @summary λ statuses ⇒ λ pay ⇒ paypal
*/

exports.handler = ({email}, _, cb) => {
  console.log(email,'-----event')
  cb(null, e)
}
