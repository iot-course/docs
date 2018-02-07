<div align='center'> <img src='https://goo.gl/UxnfW1' /></div>
<br/>

> A system for automating payments based on agile points.

- Wrokflow: `yarn submit` ⇒ creates pr ⇒ checks code ⇒ checks status 

    ✅ &nbsp; ⇒ merges pr ⇒  closes issue ⇒  authorizes payment

    ❌ &nbsp; ⇒ closes pr  



```js
yarn submit => pr open => pr review
                => status succcess  => pr close =>  merge => pay

```


todo:
- [ ] `open` action on a `pr` event, create a pr-review POST
- [ ] `success`  action on a `status` event
  - get pull number
    - list all prs and filter by head and state
    - check for body that matches commit message
  - merge a pull request
    - watch `issue` event to create close exception
- [ ] this will create a `closed` action on `pr` and start on paypal api
