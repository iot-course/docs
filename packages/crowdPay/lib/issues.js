const { asyncRequest } = require('./utils')

const undoClose = async (number, cb) => {
  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/issues/${number}`,
    'patch',
     { state:'open' },
  )
}


const getStatus = async (ref, assignee) =>{
  const { data } = await asyncRequest(`/repos/iot-course/org/statuses/${ref}`)
  if (!data.message){
    console.log({ states: data.map( ({state}) => state) })
    return data[0]['state']==='success' && data[0]['creator']['login'] === assignee
  }
}


exports.handler = async (e, _, cb) => {

  const {
    action ,
    sender: { login },
    issue: { number, labels, title:ref, assignee:{ login:assignee } },
  } = JSON.parse(e.body)



  console.log({ action })

  const successfulStatus = await getStatus(ref, assignee, cb)
  console.log({ successfulStatus })
  const closeAction = action === 'closed'
  closeAction && !successfulStatus && undoClose(number)

  cb(null, { statusCode: 200 })

}


// /**
// * Receives gh issue, then reverts or allows labels changes and issue closings based on auth
//  * @summary http ⇒ λ github-issue ⇒ request
//  * @external labelAction ? authLabelChange(number, cb) : closeAction && undoClose(number, cb)
//  * @param { Object }  Item -  JSON.parse(event.body)
//  * @param { Number }  number -  JSON.parse(event.body).issue
// */
//
//
// // deps
// const { DynamoDB: { DocumentClient } } = require('aws-sdk')
// const { asyncRequest } = require('./utils')
//
//
// // consts
// const { NODE_ENV } = process.env
// const PM = 'TA-Bot'
//
//
// // db Config
// const docClient = new DocumentClient(
//   NODE_ENV === 'local'
//   ? { region: 'us-east-1', endpoint: 'http://localhost:8000' }
//   : null
// )
//
//
// // main funcs
// const saveIssue = (Item, cb) => docClient.put({
//   TableName: 'issue-crowdpay-dev',
//   ReturnValues: 'ALL_OLD',
//   Item
// }).promise()
// .then( () => cb(null, { statusCode: 200 }))
// .catch( err => cb(err))
//
//
// const undoLabelChange = async (number, cb) => {
//
//   const { Item: { issue: { labels } } } = await docClient.get({
//     TableName: 'issue-crowdpay-dev',
//     Key: { number },
//   }).promise()
//
//
//   const { err, data:{ statusCode } } = await asyncRequest(
//     `/repos/iot-course/org/issues/${number}`,
//     'patch',
//      { labels },
//   )
//
//   statusCode ? cb(null, { statusCode }) : cb(err)
//
// }
//
// const undoClose = async (number, cb) => {
//
//   const { err, data:{ statusCode } } = await asyncRequest(
//     `/repos/iot-course/org/issues/${number}`,
//     'patch',
//      { state:'open' },
//   )
//
//   statusCode ? cb(null, { statusCode }) : cb(err)
// }
//
//
// exports.handler = (e, _, cb) => {
//
//   const { sender: { login }, issue: { number, labels }, action } = JSON.parse(e.body)
//   const Item = { number, action, issue: { number, labels }, sender: { login } }
//
//   const labelAction = action === 'labeled' || action === 'unlabeled' || action === 'edited'
//   const authLabelChange = labels.length === 1 && login === PM
//   const closeAction = action === 'closed'
//
//   labelAction
//     ? authLabelChange
//       ? saveIssue(Item, cb)
//       : undoLabelChange(number, cb)
//     : closeAction && undoClose(number, cb)
//
// }
