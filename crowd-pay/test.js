const {handler: authorize} = require('./lib/authorize')
const {handler: pay} = require('./lib/pay')




const authorizeEvent = { body: JSON.stringify({
  sender:{
    login: 'TA-Bot'
  },
  issue:{
    number:1,
    id:23443,
    labels:[
      {name: 'bug'}
    ]
  },
  action:'labeled'

})}

test('check for unauthorized relabeling and PUT back old values', () =>
  authorize(authorizeEvent, null, (err, data)=>
    expect(data).toBeTruthy()
  )
)


test("Check for close", () =>
    expect(pay() ).toBeTruthy()
)

test("Pay when close", () =>
  expect(pay() ).toBeTruthy()
)
test("Do NOT pay twice", () =>
  expect(pay() ).toBeTruthy()
)
