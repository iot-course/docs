const createMD = require('.')
const {existsSync} = require('fs');
const markdownlint = require('markdownlint')

createMD('./stub-lambdas/')
const mdPath = './docs/lambda-docs.md'

describe('The creation of Valid Markdown File 📄',  ()=>{

  test('check to see if file exists 👀 ', () =>{
    expect(existsSync(mdPath)).toBeTruthy()

  })

  ;(existsSync(mdPath) ? test: test.skip)('make sure the markdown is valid ✅', () =>{

    const  results = markdownlint.sync({
      files:mdPath,
      config:{
        "first-header-h1": false,
        "blanks-around-headers": false,
        "first-line-h1": false,
        "no-multiple-blanks": false,
        "blanks-around-fences": false,
        "no-trailing-spaces": false,
        "no-inline-html": false,
      }
    })
    expect(results[mdPath]).toHaveLength(0)

  })



})
