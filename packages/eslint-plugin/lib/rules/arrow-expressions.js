module.exports =  context => ({
  FunctionDeclaration: node =>
    (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')
    &&
    context.report(node, 'Are you sure you need the function keyword?')
})
