import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * General MyComponent2 description.
 */

class MyComponent2 extends Component{
  render(){
    return <div>
      hi
  </div>

  }
}

MyComponent2.propTypes = {
  /**
   * Description of prop "rap".
   */
  rap: PropTypes.number,
  /**
   * Description of prop "rock" (a custom validation function).
   */
  rock: function(props, propName, componentName) {
    // ...
  },
  rnb: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};

MyComponent2.defaultProps = {
  rap: 42,
  rock: 21
};

export default MyComponent2;
