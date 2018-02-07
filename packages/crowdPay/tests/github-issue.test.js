const { handler: githubIssueEvent } = require('../lib/github-issue')



describe(
  `Correct Gihhub user is auhorized
  to make label/point changes`, () =>{


  test.skip(`Unauthorized user changes label and
    a few seconds later the change is reverted`, done =>{


    const event = { body: JSON.stringify({
      sender:{ login: 'wordyallen' },
      issue:{ number:1, labels:[ {name: '8'} ] },
      action:'labeled'
    })}

    githubIssueEvent(event, null, (err, {statusCode}) =>{
      expect(statusCode).toBe(200)
    })
    done()

  })

  test(`Save authorized label changes`, done =>{

      const event = { body: JSON.stringify({
        sender:{ login: 'TA-Bot' },
        issue:{ number:1, labels:[ { name: '2' } ] },
        action:'labeled'
      })}

      githubIssueEvent(event, null, (err, {statusCode}) =>
        expect(statusCode).toBe(200)
      )
      done()

    })

    test.skip('Undoes label close', done =>{

      const event = { body: JSON.stringify({
        sender:{ login: 'TA-Bot' },
        issue:{ number:1, labels:[ { name: '2' } ] },
        action:'closed'
      })}

      githubIssueEvent(event, null, (err, {statusCode}) =>{
        expect(statusCode).toBe(200)
        done()
      })

    })

})
