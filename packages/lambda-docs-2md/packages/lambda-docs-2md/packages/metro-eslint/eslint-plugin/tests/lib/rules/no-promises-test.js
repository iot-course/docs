const rule = require("../../../lib/rules/no-promises")
const {RuleTester} = require('eslint')

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
  }
})


const ruleTester = new RuleTester()


ruleTester.run("no-promises", rule, {
    valid: [
      {
          code: `
          const rap = async () =>{
            const someVal = await someThenable()
            return someVal
          }
          `,
      }
    ],
    invalid: [
        {
            code: `
            someThenable()
            .then( someVal => rap(someVal) )
            `,
            errors: [{
                message: 'No promises',
            },]
        },
    ]
})
