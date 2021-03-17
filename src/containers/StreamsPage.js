import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../actions/streamActions'
import StreamList from '../components/StreamList'

class StreamsPage extends Component {   
  
  componentDidMount() {
    localStorage.setItem('currentStream', '');
    localStorage.setItem('currentStreamName', '');
    this.props.fetchStreams()
  }

  componentDidUpdate(){
    localStorage.setItem('currentStream', '');
    localStorage.setItem('currentStreamName', '');    
  }
//binds passed handler to StreamsPage handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this)
  }
// recieves id from passed handler
  handler = (id,name) => {
    console.log('stream set')
    this.setState({
      currentStream: id,
      currentStreamName: name
    })
 //returns the selected Stream id to App       
    this.props.handler(id,name)
  }
  
  handleLoading = () => {
    if(this.props.loading) {
      return <div>Loading Streams...</div>
    } else {
      
      return <StreamList streamInfo={this.props.streamInfo} currentStream={this.props.currentStream} handler={this.handler}/>
    }
  }

  handleFunctions = (e) =>{
    this.props.pointer(e)
    this.props.resetCount()
  }

  render() {
    return (
      <div className="App" onClick={this.handleFunctions}>
        {this.handleLoading()}
      </div>
    );
  }
}



const mapDispatchToProps = state => {
  return {
    streamInfo: state.StreamsReducer.streams.sort(),
    loading: state.StreamsReducer.loading,
    currentStream: state.StreamsReducer.currentStream
  }
}

export default connect(mapDispatchToProps, { fetchStreams })(StreamsPage)