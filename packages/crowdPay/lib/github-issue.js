/**
* Authorizes github point/label changes and reverts back if unauthorized
 * @summary http ⇒ λ authorize ⇒ request
 * @external  request(options(ghAccessToken, number),...)
 * @param { String }  action -  JSON.parse(event.body)
 * @param { String }  login -  JSON.parse(event.body).sender
 * @param { Number }  number -  JSON.parse(event.body).issue
 * @param { Array }  labels -  JSON.parse(event.body).issue
 * @arg { Array }  ghAccessToken -  process.env
 */


const { request } = require('https')
const { DynamoDB: { DocumentClient } } = require('aws-sdk')


const { NODE_ENV, ghAccessToken } = process.env
const PM = 'TA-Bot'
// const DOLLARS_PER_POINT = 0.01


const docClient = new DocumentClient(
  NODE_ENV === 'local'
  ? { region: 'us-east-1', endpoint: 'http://localhost:8000' }
  : null
)

exports.handler = (e, _, cb) => {

  const { sender: { login}, issue: { number, labels}, action } = JSON.parse(e.body)
  const Item = { number, action, issue: { number, labels }, sender: { login } }

  labels.length === 1 &&
  (login === PM) &&
  (action === "labeled" || action === "unlabeled" || action === "edited")
    ? saveIssue(Item, cb)
    : patchIssue(number, cb)

}

const saveIssue = (Item, cb) => docClient.put({
  TableName: 'issue-crowd-pay-dev',
  ReturnValues: 'ALL_OLD',
  Item
}).promise()
.then(data => cb(null, {statusCode: 200}))
.catch(err => cb(err))


const patchIssue = (number, cb) => {
  const options = {
    method: 'patch',
    hostname: 'api.github.com',
    path: `/repos/iot-course/org/issues/${number}`,
    headers: {
      'User-Agent': 'Crowd Pay',
      Authorization: `token ${ghAccessToken}`
    }
  }

  const req = request(options, ({statusCode}) => cb(null, {statusCode}))

  docClient.get({TableName: 'issue-crowd-pay-dev', Key: {
      number
    }}).promise().then(({
    Item: {
      issue: {
        labels
      }
    }
  }) => {
    req.write(JSON.stringify({labels}))
    req.end()
  }).catch(err => cb(err))

}
