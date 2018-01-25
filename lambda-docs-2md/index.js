#! /usr/bin/env node
const {parse} = require('doctrine')
const json2md = require('json2md')
const { readdirSync, readFileSync, writeFileSync } = require('fs')
var mkdirp = require('mkdirp')


const lambdaDocs2md = lambdaPath => {

  // [1] init dir
  mkdirp.sync('./docs')

  // [2] get comments object
  const comments = readdirSync(lambdaPath).map( filename =>
     parse(readFileSync(lambdaPath + '/'+ filename, 'utf8' ).split('*/')[0], {unwrap:true})
  )


  // [3] convert comments object to markdown
  const md = comments.map( ({description, tags}) => {

    const getDesc = key => (tags.filter( ({title})  =>  title=== key )[0]||{}).description

    const getRows = tags.map( ({title, name, type, description}) =>
     title==='arg' || title==='param'
      ? ({
          'arg / param': '`' + name + '`',
          type:  '`' + type.name + '`',
          path: '`' + description + '`' })
      : false
    ).filter( arr => arr)


    const formattedMD =[
      {h2: '`' + getDesc('summary')  + '`'},
      {p: description},
      {p: '**Callback / External Call:**'},
      {
        code: {
          language: "js",
          content: getDesc('external') || getDesc('callback'),
        }
      },
      {
        table: {
          headers: ['arg / param', 'type', 'path'],
          rows: getRows
        }
      }
    ]

    return json2md(formattedMD) + '<br/> \n';
  }).join('')


  // [4] write to lambda-docs.md
  writeFileSync('./docs/lambda-docs.md', md)

}


module.exports = lambdaDocs2md

process.argv[2]
  ? lambdaDocs2md(process.argv[2])
  : null
