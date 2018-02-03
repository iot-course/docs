#  λ Lambda Docs ⇒ Markdown

Using [jsdoc comments](), this module creates docs for your aws lambda folder according to this format:

----
## `http ⇒ λ getKeys ⇒ cb`


Gets authorization keys to subscribe to an IoT Topic


**Callback / External Call:**

```js
cb(null, body:{ endpointAddress, ...{Credentials} })
```

arg / param | type | path
--- | --- | ---
`endpointAddress` | `String` | `aws.iot.describeEndpoint()`
`Credentials` | `Object` | `aws.sts.assumeRole()`
<br/>

---

## Install
```
yarn add comoponent-docs-2md --dev
```

## Usage

You **must** add you jsdoc comments tat the very top.  The parse does not search past the top.  

For example:
```js
/**
 * Gets authorization keys to subscribe to IoT Topic
 * @summary http ⇒ λ getKeys ⇒ cb
 * @param {string} key - event.Records[0].s3.object.key
 * @callback  cb(null, body:{ host, accessKeyId, secretKey, sessionToken  })
 */

const {ElasticTranscoder} = require('aws-sdk')
const et = new ElasticTranscoder({region: 'us-east-1'})

exports.getKeys = (
  { Records:[ { s3: { object: { key } } } ] },
  _,
  cb) => {

  ...

}

```

In `package.json`
```json
"scripts":{
  "lambdaDocs": "lambda-docs-2md ./services"
}
```


TODO
- [ ] ability to add multiple main `@external` and/or `@callback` and render by type
