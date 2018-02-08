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
- [ ] `make sure` opening apr with the title as the feature name creates a `reopen` action on the issue
