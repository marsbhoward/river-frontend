import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStreams } from '../actions/userStreamActions'
import Profile from '../components/Profile';

class UserStreamsPage extends Component {   
  
  componentDidMount() {
    this.props.fetchUserStreams(this.props.userId)
    console.log(this)
  }
//binds passed handler to StreamsPage handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this)
  }
// recieves id from passed handler
  handler = (id,name) => {
    this.setState({
      currentStream: id,
      currentStreamName: name
    })
 //returns the selected Stream id to App       
    this.props.handler(id,name)
  }
  
  handleLoading = (id) => {
    if(this.props.loading) {
      return <div>Loading Streams...</div>
    } else {
      
      return <Profile userID={id} userStreams={this.props.userStreams} handleLists={this.handleLists} editClicked={this.state.streamEdit}/>
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
    userStreams: state.StreamsReducer.streams,
    loading: state.StreamsReducer.loading,
    currentStream: state.StreamsReducer.currentStream
  }
}

export default connect(mapDispatchToProps, { fetchUserStreams })(UserStreamsPage)