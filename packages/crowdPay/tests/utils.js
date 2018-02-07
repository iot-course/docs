const {writeFile} = require('fs')
const { ghAccessToken } = process.env

if (!ghAccessToken){
  const {ghAccessToken} = require('../.env.json')
  process.env.ghAccessToken = ghAccessToken
}



// testing helper functions
exports.createEvent = (filename, obj) =>{
  writeFile('./tests/events/' + filename, JSON.stringify(obj), 'utf8',
    err=>console.error(err.message)
  )

}
