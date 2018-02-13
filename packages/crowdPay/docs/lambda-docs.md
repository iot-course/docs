<br/>
<br/>

<div align='center'> <img src='https://goo.gl/UxnfW1' /></div>
<br/>
<br/>
<br/>
<br/>

## `github ⇒ λ github-issue ⇒ request`


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


## `λ github-status ⇒ λ pay ⇒ stripe`

`λ pay` gets called by a github status lambda  that approves payment based on merge status. `λ pay` then authorizes payment based on github email of the assignee/pull requester of the feature.  
