import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../actions/streamActions'
import StreamList from '../components/StreamList'


class StreamsPage extends Component {   
  
  componentDidMount() {
    this.props.fetchStreams()
  }
//binds passed handler to StreamsPage handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this)
  }
// recieves id from passed handler
  handler = id => {
    this.setState({
      currentStream: id
    })
 //returns the selected Stream id to App       
    this.props.handler(id)
  }
  
  handleLoading = () => {
    if(this.props.loading) {
      return <div>Loading Streams...</div>
    } else {
      
      return <StreamList streamInfo={this.props.streamInfo} currentStream={this.props.currentStream} handler={this.handler}/>
    }
  }

  render() {
    return (
      <div className="App">
        {this.handleLoading()}
      </div>
    );
  }
}



const mapDispatchToProps = state => {
  return {
    streamInfo: state.StreamsReducer.streams,
    loading: state.StreamsReducer.loading,
    currentStream: state.StreamsReducer.currentStream
  }
}

export default connect(mapDispatchToProps, { fetchStreams })(StreamsPage)