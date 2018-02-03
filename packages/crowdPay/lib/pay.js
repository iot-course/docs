/**
 * Pays developer per points in closed feature
 * @summary http ⇒ λ pay ⇒ request
 * @param {string} body - JSON.parse(event.body)
 * @callback  request(payPalAccessToken, ghEmail)
 */

const {request} = require('https')

exports.handler = (e, _, cb) => {

  const {action, sender:{login}, assignee} = JSON.parse(e.body)
  const email = getEmail(assignee)

  action==='closed'
  login===assignee &&
  assigneeBuildStatus() &&
  checkLinesOfCodeToPoints()
    ? pay(email)
    : reopen()
}

const getEmail = () => 'test@test.com'
const pay = email => {
  const options = {}
  const req = request(options, ({statusCode}) => cb( null, {statusCode} ) )
  req.write(JSON.stringify({a:1}) )
  req.end()

}
const assigneeBuildStatus = () =>{}
const checkLinesOfCodeToPoints = () =>{}

const reopen = ()=>{}
