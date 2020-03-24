import React, { Component } from 'react';

class Stream extends Component {


  render() {
    return (
      <div>
        <li>{this.props.name}</li>
      </div>
    )
  }
};

export default Stream;