import React, { Component } from 'react';
import Restaurants from '../components/streams/Restaurants'
import { connect } from 'react-redux'

class StreamsContainer extends Component {
  render() {
    return (
      <div>   
        <Streams
          streams={this.props.streams}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ streams: state.streams })



export default connect(mapStateToProps)(StreamsContainer)