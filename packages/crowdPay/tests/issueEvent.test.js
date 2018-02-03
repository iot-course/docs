const {handler: issueEvent} = require('../lib/issueEvent')
const {createEvent} = require('./utils')

const defaultIssue = { body: JSON.stringify({
  sender:{
    login: 'TA-Bot'
  },
  issue:{
    number:1,
    labels:[
      {name: '1'}
    ]
  },
  action:'labeled'

})}



createEvent('issueEvent.json', defaultIssue)


// describe(`Correct Gihhub user is auhorized
//   to make label/point changes`, () =>{
//
//
//   test(`Unauthorized user changes label and
//     a few seconds later the change is reverted`, () =>
//       expect(1).toBe(2)
//   )
//
//   test(`Authorized user changes label and
//     a few seconds later his changes persist`, () =>
//       expect(1).toBe(2)
//   )
//
// })






// test('check for unauthorized relabeling and PUT back old values', () =>
//   authorize(authorizeEvent, null, (err, data)=>
//     expect(data).toBeTruthy()
//   )
// )
//
//
// test("Check for close", () =>
//     expect(pay() ).toBeTruthy()
// )
//
// test("Pay when close", () =>
//   expect(pay() ).toBeTruthy()
// )
// test("Do NOT pay twice", () =>
//   expect(pay() ).toBeTruthy()
// )
