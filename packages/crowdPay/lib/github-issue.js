/**
* Authorizes github point/label changes and reverts back if unauthorized
 * @summary http ⇒ λ authorize ⇒ request
 * @external authLabelClose ? pay(assignee, cb) : reopen(cb)
 * @external authLabelChange ? saveIssue(Item, cb) : patchIssue(number, cb)
 * @param { String }  assignee -  JSON.parse(event.body).issue
 * @param { Object }  Item -  JSON.parse(event.body)
 * @param { Number }  number -  JSON.parse(event.body).issue
 */


// deps
const { request } = require('https')
const { DynamoDB: { DocumentClient } } = require('aws-sdk')


// consts
const { NODE_ENV, ghAccessToken } = process.env
const PM = 'TA-Bot'
// const DOLLARS_PER_POINT = 0.01


// db Config
const docClient = new DocumentClient(
  NODE_ENV === 'local'
  ? { region: 'us-east-1', endpoint: 'http://localhost:8000' }
  : null
)


// helpers
const asyncRequest = (path, method = 'get', writeBody) => new Promise( (resolve, reject) => {

  const options = {
    headers:{
      'User-Agent': 'Crowd Pay',
      Authorization: `token ${ghAccessToken}`
    },
    hostname: 'api.github.com',
    method,
    path,
  }

  const req = request(options, res => {
    if (method === 'get') {
      let readBody = ''
      res.on('data', d => readBody += d)
      res.on('end', () => resolve(JSON.parse(readBody) ) )
      res.on('error', err => reject(err) )
    } else {
      resolve(res)
    }
  })
  method !== 'get' && req.write(JSON.stringify(writeBody))
  req.on('error', err => reject(err) )
  req.end()

})
.then( data => [null, data])
.catch( err => [err])

// main funcs
const saveIssue = (Item, cb) => {
  // console.log('--saving')
    docClient.put({
    TableName: 'issue-crowdpay-dev',
    ReturnValues: 'ALL_OLD',
    Item
  }).promise()
  .then( () => cb(null, { statusCode: 200 }))
  .catch(err => cb(err))
}

const patchIssue = async (number, cb) => {


  const { Item: { issue: { labels } } } = await docClient.get({
    TableName: 'issue-crowdpay-dev',
    Key: { number },
  }).promise()

  const [err, { statusCode }] = await asyncRequest(`/repos/iot-course/org/issues/${number}`, 'patch', { labels })

  statusCode ? cb(null, { statusCode }) : cb(err)

}

const reopen = cb => {
  // console.log('reopen-----')
  cb()
}


const pay = async (assignee, cb) => {

  const [err, { email, statusCode }] = await asyncRequest(`/users/${assignee}`)
  email ? cb(null, { statusCode }) : cb(err)

}

exports.handler = async (e, _, cb) => {

  const { sender: { login }, issue: { number, labels, assignee }, action } = JSON.parse(e.body)
  const Item = { number, action, issue: { number, labels }, sender: { login } }

  const labelChange = (action === 'labeled' || action === 'unlabeled' || action === 'edited' )
  const authLabelChange = labels.length === 1 && login === PM
  const authLabelClose = action === 'closed' && assignee === login


  labelChange
    ? authLabelChange
      ? saveIssue(Item, cb)
      : patchIssue(number, cb)
    : authLabelClose
      ? pay(assignee, cb)
      : reopen(cb)


}
