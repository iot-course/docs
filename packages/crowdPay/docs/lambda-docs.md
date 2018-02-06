
## `http ⇒ λ github-issue ⇒ request`


Receives an issue event object from github and reverts/allows labels changes and issue closings


**Callback / External Calls:**

```js
labelAction
  ? authLabelChange
    ? saveIssue(Item, cb)
    : undoLabelChange(number, cb)
  : closeAction && undoClose(number, cb)
```

arg / param | type | path
--- | --- | ---
`Item` | `Object` | ` JSON.parse(event.body)`
`number` | `Number` | ` JSON.parse(event.body).issue`
<br/>

## `undefined`





**Callback / External Call:**

```js
undefined
```

arg / param | type | path
--- | --- | ---

<br/>

## `undefined`


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


**Callback / External Call:**

```js
undefined
```

arg / param | type | path
--- | --- | ---

<br/>
