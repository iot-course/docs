<div align='center'> <img src='https://goo.gl/UxnfW1' /></div>
<br/>

> A system for automating payments based on agile points.

- Wrokflow: `yarn submit` ⇒ creates pr ⇒ checks status ⇒ checks code

    ✅ &nbsp; ⇒ merges pr ⇒  closes issue ⇒  authorizes payment

    ❌ &nbsp; ⇒ closes pr  



```js
yarn submit => pr open => pr review
                => status succcess  => pr close =>  merge => pay

```
- todo
  - [ ] `review requested` action on pr webhook
  - [ ] `success` action check on status webhook
  - [ ] `closed` action on pr webhook (merge and pay)
