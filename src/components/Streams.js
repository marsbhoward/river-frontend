import React, { Component } from 'react';
import { connect } from 'react-redux';
import StreamInput from './StreamInput';

class Streams extends Component{

  render() {

    let streams = this.props.streams.map(stream => <li key={stream.id}>{stream.name}</li>);

    return (
      <div>
      <h2>Streams</h2>
        <ul>
        {streams}
      	<StreamInput />
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { streams: state.streams }
}

export default connect(mapStateToProps)(Streams);
