import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStreams } from '../actions/userStreamActions'
import Profile from '../components/Profile';
import User from '../components/User';

class UserStreamsPage extends Component {   
  constructor(props){
    super(props)
    //binds passed handler to UserStreamsPage handler
    this.handler = this.handler.bind(this)
    this.state = {
      cssColor: ""
    }
  } 

  
  componentDidMount() {
    sessionStorage.setItem('currentStream', ' ');
    sessionStorage.setItem('currentStreamName', ' ');
    this.props.fetchUserStreams(this.props.userId)
  }

  componentDidUpdate(prevProps){
    if (prevProps!== this.props){
      console.log(this.state.cssColor)
      this.setState({cssColor: this.props.css('UserStreams',this.props.darkmodeProp)}) 
      sessionStorage.setItem('currentStream', ' ');
      sessionStorage.setItem('currentStreamName', ' '); 
    }
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

  handleFunctions = (e) =>{
    this.props.pointer(e)
    this.props.resetCount()
  }

  render() {
    return (
      <div style={{background:this.state.cssColor}}  className="App" onClick={this.handleFunctions}>
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