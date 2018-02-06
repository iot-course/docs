const { request } = require('https')

const { ghAccessToken } = process.env

exports.asyncRequest = (path, method = 'get', writeBody) => new Promise( (resolve, reject) => {

  const options = {
    headers:{
      'User-Agent': 'crowdpay',
      auth: `TA-Bot:${ghAccessToken}`,
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
.then( data => ({ err:null, data }))
.catch( err => ({ err, data: null }))
