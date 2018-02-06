/**
* A system of checking those authorized to changes labels and
* thereby point values and authorizing of issue closing and payment.
 * @summary http ⇒ λ github-issue ⇒ mutliple conditional requests
 * @external authLabelClose ? handleLabelClose() : authLabelClose ? pay(assignee) : reopen()
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


// request helper
const asyncRequest = (path, method = 'get', writeBody) => new Promise( (resolve, reject) => {

  const options = {
    headers:{
      'User-Agent': 'crowdpay',
      auth: `wordyallen:${ghAccessToken}`,
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
.then( data => ({ err:null, data }))
.catch( err => ({ err, data: null }))


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

  const { err, data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/issues/${number}`,
    'patch',
    { labels }
  )

  statusCode ? cb(null, { statusCode }) : cb(err)

}

const reopen = cb => {
  console.log('reopen-----')
  cb()
}


const pay = async (assignee, cb) => {

  const { err, data:{ email, statusCode } } = await asyncRequest(`/users/${assignee}`)
  email ? cb(null, { statusCode }) : cb(err)

}

const checkCommitStatus = async () => {

  // const { err, data} = await asyncRequest(
  //   `/repos/iot-course/org/commits/check-changes-of-commit/statuses`
  // )
  // console.log(data[2], '----data')
  return false
}

// call compare commits https://developer.github.com/v3/repos/commits/#compare-two-commits
// const [err, { total }] = await asyncRequest(`some'. github path`)
const checkPointsToStats = points => {

  console.log(`checking points to stats: ${points}---`)
  return false
}

exports.handler = async (e, _, cb) => {

  const { sender: { login }, issue: { number, labels, assignee, title:feature }, action } = JSON.parse(e.body)
  const Item = { number, action, issue: { number, labels }, sender: { login } }
  const [{ name:points }] = labels

  const labelChange = (action === 'labeled' || action === 'unlabeled' || action === 'edited' )
  const authLabelChange = labels.length === 1 && login === PM
  const authLabelClose = (action === 'closed' && assignee === login)
    && checkCommitStatus()
    && checkPointsToStats(+points)


  labelChange
    ? authLabelChange
      ? saveIssue(Item, cb)
      : patchIssue(number, cb)
    : authLabelClose
      ? pay(assignee, cb)
      : reopen(cb)


}
