const rule = require("../../../lib/rules/arrow-expressions")
const {RuleTester} = require('eslint')

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
})


const ruleTester = new RuleTester()


ruleTester.run("arrow-expressions", rule, {
    valid: [
      {
          code: 'const rap = () =>  totallyTubular()',
      }
    ],
    invalid: [
        {
            code: 'function rap(){}',
            errors: [{
                message: 'Are you sure you need the function keyword?',
            },]
        },
    ]
})
