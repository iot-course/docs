import React from 'react'
import PropTypes from 'prop-types';


const Text = ({rap}) => <div rap  >yo</div>



Text.propTypes ={
  rap: PropTypes.boolan
}


// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
//
// /**
//  * General MyComponent1 description.
//  */
//  const MyComponent1 = () => <div>hi</div>
//
// MyComponent1.propTypes = {
//   /**
//    * Description of prop "foo".
//    */
//   foo: PropTypes.number,
//   /**
//    * Description of prop "bar" (a custom validation function).
//    */
//   bar: function(props, propName, componentName) {
//     // ...
//   },
//   baz: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.string
//   ]),
// };
//
// MyComponent1.defaultProps = {
//   foo: 42,
//   bar: 21
// };

export default Text;
