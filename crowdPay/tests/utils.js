const {writeFile} = require('fs')
exports.createEvent = (filename, obj) =>{

  writeFile('tests/'+filename, JSON.stringify(obj), 'utf8',
    err=>console.error(err.message)
  )


}
