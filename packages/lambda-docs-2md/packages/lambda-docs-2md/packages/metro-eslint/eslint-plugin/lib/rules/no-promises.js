module.exports =  context => ({
  Identifier: node =>
   node.name === 'then'&&
   context.report(node, 'No promises')
})
