## `http ⇒ λ authorize ⇒ request`


Authorizes github point/label changes and reverts back if unauthorized


**Callback / External Call:**

```js
request(options(ghAccessToken, number, id),...)
```

arg / param | type | path
--- | --- | ---
`action` | `String` | ` JSON.parse(event.body)`
`login` | `String` | ` JSON.parse(event.body).sender`
`number` | `Number` | ` JSON.parse(event.body).issue`
`id` | `Number` | ` JSON.parse(event.body).issue`
`labels` | `Array` | ` JSON.parse(event.body).issue`
`ghAccessToken` | `Array` | ` process.env`
<br/>
## `http ⇒ λ pay ⇒ request`


Pays developer per points in closed feature


**Callback / External Call:**

```js
request(payPalAccessToken, ghEmail)
```

arg / param | type | path
--- | --- | ---
`body` | `string` | `JSON.parse(event.body)`
<br/>
