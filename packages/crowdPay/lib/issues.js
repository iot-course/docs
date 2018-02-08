/**
* Receives gh issue, then reverts or allows labels changes and issue closings based on auth
 * @summary http ⇒ λ github-issue ⇒ request
 * @external labelAction ? authLabelChange(number, cb) : closeAction && undoClose(number, cb)
 * @param { Object }  Item -  JSON.parse(event.body)
 * @param { Number }  number -  JSON.parse(event.body).issue
*/

const { asyncRequest } = require('./utils')
const { DynamoDB: { DocumentClient } } = require('aws-sdk')

const { NODE_ENV } = process.env
const PM = 'TA-Bot'


// db Config
const docClient = new DocumentClient(
  NODE_ENV === 'local'
  ? { region: 'us-east-1', endpoint: 'http://localhost:8000' }
  : null
)


const undoClose = async number => {
  console.log('undoing close!')
  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/issues/${number}`,
    'patch',
     { state:'open' },
  )
}


// const getStatus = async (ref, assignee) =>{
//   console.log('getting statuses')
//   const { data } = await asyncRequest(`/repos/iot-course/org/statuses/${ref}`)
//   if (!data.message){
//     console.log({ states: data.map( ({state}) => state) })
//     return data[0]['state']==='success' && data[0]['creator']['login'] === assignee
//   }
// }

const saveIssue = async Item => {
  const data = await docClient.put({
    TableName: 'issue-crowdpay-dev',
    ReturnValues: 'ALL_OLD',
    Item
  }).promise()

  data && console.log('successful save')
}




const undoLabelChange = async number => {

  const { Item: { issue: { labels } } } = await docClient.get({
    TableName: 'issue-crowdpay-dev',
    Key: { number },
  }).promise()
  .catch(err => console.log(err.message))

  const { data:{ statusCode } } = await asyncRequest(
    `/repos/iot-course/org/issues/${number}`,
    'patch',
     { labels },
  )
  console.log({ labelChangeCode: statusCode })
}


exports.handler = async (e, _, cb) => {

  const {
    action ,
    sender: { login },
    issue: {
      number,
      labels,
      title:ref,
      assignee:{ login:assignee }
    },
  } = JSON.parse(e.body)


  const Item = { number, issue: { labels } }

  const labelAction = action === 'labeled' || action === 'unlabeled' || action === 'edited'
  const labelAuth = labels.length === 1 && login === PM
  const closeAction = action === 'closed' && login !==  PM


  labelActionx
    ? labelAuth
      ? saveIssue(Item)
      : undoLabelChange(number)
    : closeAction && undoClose(number)

  cb(null, { statusCode: 200 })

}
