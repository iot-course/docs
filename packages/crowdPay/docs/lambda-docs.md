
## `http ⇒ λ github-issue ⇒ mutliple conditional requests`


A system of checking those authorized to changes labels
and thereby point values and authorizing of issue closing and payment


**Callback / External Call:**

```js
authLabelClose ? handleLabelClose() : authLabelClose ? pay(assignee) : reopen()
```

arg / param | type | path
--- | --- | ---
`assignee` | `String` | ` JSON.parse(event.body).issue`
`Item` | `Object` | ` JSON.parse(event.body)`
`number` | `Number` | ` JSON.parse(event.body).issue`
<br/>
