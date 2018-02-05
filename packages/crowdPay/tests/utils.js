const {writeFile} = require('fs')
const {ghAccessToken} = require('../.env.json')

//environment variables
process.env.ghAccessToken= ghAccessToken


// testing helper functions
exports.createEvent = (filename, obj) =>{
  writeFile('./events/' + filename, JSON.stringify(obj), 'utf8',
    err=>console.error(err.message)
  )

}
