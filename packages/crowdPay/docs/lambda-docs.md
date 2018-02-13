<br/>
<br/>

<div align='center'> <img src='https://goo.gl/UxnfW1' /></div>
<br/>
<br/>
<br/>
<br/>

## `github ⇒ λ github-issue ⇒ request`


Receives an issue event object from github based on a label change (which is how points are tracked) or close action. Then based on who is creating the action authorizes the point change or the issue closing.


**Callback / External Calls:**

```js
labelAction
  ? authPointChange
    ? savePointChange(Item, cb)
    : undoPointChange(number, cb)
  : closeAction && undoClose(number, cb)
```

arg / param | type | path
--- | --- | ---
`Item` | `Object` | ` JSON.parse(event.body)`
`number` | `Number` | ` JSON.parse(event.body).issue`
<br/>


## `λ github-status ⇒ λ pay ⇒ stripe`

`λ pay` gets called by a github status lambda  that approves payment based on merge status. `λ pay` then authorizes payment based on github email (of the assignee of the feature) and point amount.  
