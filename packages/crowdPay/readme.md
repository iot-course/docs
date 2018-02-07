<div align='center'> <img src='https://goo.gl/UxnfW1' /></div>
<br/>

> A system for automating payments based on agile points.

- Wrokflow: `yarn submit` ⇒ creates pr ⇒ checks status ⇒ checks code

    ✅ &nbsp; ⇒ merges pr ⇒  closes issue ⇒  authorizes payment

    ❌ &nbsp; ⇒ closes pr  


- todo review

- todo status
  - [ ] create a `status` webhook
  - [ ] if status if 'success', then get commit message and branch
  - [ ] list prs and filter by states and branch name
  - [ ] matching commit message to pr body, eg, "closes #1"
  - [ ] if matched, check additions and deletions to points
  - [ ] if not, closes pr
  - [ ] merge pull request (merge button)
  - [ ] create a close issue exception

- todo pr: review and pay
  - [ ] create `pull request` webhook
  - [ ] check for authorized closes by correct user
  - [ ] check for new created prs and  issue a pr review with the lines of code check
  - [ ] start on the paypal api....
