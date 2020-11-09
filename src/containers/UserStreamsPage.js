import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStreams } from '../actions/userStreamActions'
import Profile from '../components/Profile';
import User from '../components/User';

class UserStreamsPage extends Component {   
  
  componentDidMount() {
    this.props.fetchUserStreams(this.props.userId)
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
  


  handleLoading = (id) => {
    if(this.props.loading) {
      return <div>Loading Streams...</div>
    } else {
      let selectedStreams = []
      this.props.userStreams.forEach ( stream =>{
	  	if (stream.selected === true){
	  		selectedStreams.push(stream)
	  	}

      })  
      return <Profile userID={id} userStreams={selectedStreams} handleLists={this.handleLists} handler={this.handler} streamLinks={true}/>
    }
  }

  render() {
    return (
      <div className="App">
        <User/>
        {this.handleLoading(this.props.userId)}
      </div>
    );
  }
}


const mapDispatchToProps = state => {
  return {
    userStreams: state.StreamsReducer.streams.sort(),
    loading: state.StreamsReducer.loading
  }
}

export default connect(mapDispatchToProps, {fetchUserStreams})(UserStreamsPage)