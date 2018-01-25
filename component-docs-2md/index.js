#! /usr/bin/env node
const {parse} = require('react-docgen')
const json2md = require('json2md')
const { readdirSync, readFileSync, writeFileSync } = require('fs')
var mkdirp = require('mkdirp')





const componentDocs2MD = (lambdaPath) => {


  // [1] init dir
  mkdirp.sync('./docs')

  // [2] get component docs object
  const docs = readdirSync(lambdaPath).map( filename =>
     ({
       name: filename.slice(0, -3),
       ...parse(readFileSync(lambdaPath + '/' + filename, 'utf8'))
     })
  )


  // [3] convert component docs to markdown
  const md = docs.map( ({name, description, props}) =>
    ( props && (name[0] === name[0].toUpperCase()) )
      ? createMarkdown(name, description, props)
      : null
  ).join('')


  //[4] write to components-docs.md
  writeFileSync('./docs/component-docs.md', md)
}


const createMarkdown = (name, description, props) =>
  json2md([
    {h2: '`<' + name  + '/>`'},
    {p: description},
    {
      table: {
        headers: ["prop", "type", 'description'],
        rows: getRows(props)
      }
    }
  ]) + '<br/> \n'

const getRows = props =>
  Object.keys(props).map( prop =>
    ({
      prop: '`' + prop + '`',
      type: '`' +  ((props[prop] ||{}).type || {}).name.capitalize() + '`',
      description: props[prop].description || '*no description given*'
    })
  )



//helpers
String.prototype.capitalize = function(){
  return this[0].toUpperCase() + this.slice(1)
}


module.exports = componentDocs2MD

process.argv[2]
  ? componentDocs2MD(process.argv[2])
  : null
