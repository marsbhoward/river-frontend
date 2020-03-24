import React, { Component } from 'react'
import Streams from './Streams';
import { connect } from 'react-redux';

class StreamsContainer extends Component {
  render() {
    return (
      <div>
        <Streams stream={this.props.streams}/>
      </div>
    )
  }
}

const mapStateToProps = ({ streams }) => ({ streams })

export default connect(mapStateToProps)(StreamsContainer)