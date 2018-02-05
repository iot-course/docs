const { handler: githubIssueEvent } = require('../lib/github-issue')

const { get, request } = require('https')


describe(
  `Correct Gihhub user is auhorized
  to make label/point changes`, () =>{


  test(`Unauthorized user changes label and
    a few seconds later the change is reverted`, () =>{


    const event = { body: JSON.stringify({
      sender:{ login: 'wordyallen' },
      issue:{ number:1, labels:[ {name: '8'} ] },
      action:'labeled'
    })}

    githubIssueEvent(event, null, (err, {statusCode}) =>{
      expect(statusCode).toBe(200)
    })

  })

  test(`Authorized user changes label and
    a few seconds later his changes persist`, () =>{

      const event = { body: JSON.stringify({
        sender:{ login: 'TA-Bot' },
        issue:{ number:1, labels:[ { name: '2' } ] },
        action:'labeled'
      })}

      githubIssueEvent(event, null, (err, {statusCode}) =>
        expect(statusCode).toBe(200)
      )

    })

})

describe(`Assignee gets paid after all criteria is valid`, () =>{

  test('breaking', ()=> expect(1).toBe(1))
  // test('breaking2', ()=> expect(1).toBe(2))

//   test('Assignee closes issue that IS ready to be closed', ()=>{
//
//     const event = { body: JSON.stringify({
//       sender:{ login: 'wordyallen' },
//       issue:{ assignee:'wordyallen' ,number:1, labels:[ { name: '2' } ] },
//       action:'closed'
//     })}
//
//     githubIssueEvent(event, null, (err, {statusCode})=>{
//       expect(statusCode).toBe(200)
//     })
//
//   })

    // test('Assignee closes issue that is NOT ready to be closed and is going to reopen', ()=>{
    //
    //   const event = { body: JSON.stringify({
    //     sender:{ login: 'TA-Bot' },
    //     issue:{ assignee:'wordyallen' ,number:1, labels:[ { name: '2' } ] },
    //     action:'closed'
    //   })}
    //
    //
    //   githubIssueEvent(event, null, (err, {statusCode})=>{
    //     expect(statusCode).toBe(202)
    //   })
    // })

  })
