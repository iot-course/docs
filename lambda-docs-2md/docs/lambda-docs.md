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
## `s3 ⇒ λ transcodeVideo ⇒ elasticTranscoder`


Creates transcoding job upon video upload


**Callback / External Call:**

```js
elasticTranscoder.createJob(params: { PipelineId, Input, Outputs }, ...)
```

arg / param | type | path
--- | --- | ---
`key` | `String` | `event.Records[0].s3.object.key`
<br/> 
