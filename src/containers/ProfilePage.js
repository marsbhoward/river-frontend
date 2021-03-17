import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStreams } from '../actions/userStreamActions'
import Profile from '../components/Profile';
import { Auth0Context } from "../react-auth0-spa";
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'
import $ from 'jquery'; 


let selectList = []
class ProfilePage extends Component {
 static contextType = Auth0Context; 

  constructor(props){
    super(props)
    this.state = {
      streamEdit: false
    }
  } 

  
  componentDidMount() {
    this.props.fetchUserStreams(this.props.userId)
  }


  componentDidUpdate(prevProps){
    localStorage.setItem('currentStream', ' ');
    localStorage.setItem('currentStreamName', ' ');
  }

  fetchUserStreams = (id) => {
    this.setState({
      userID: id
    })
  }

  findTarget = (e) => {
    // access to e.target here
    console.log($(e.currentTarget)[0].className);
}

  handleSwitch = (dom,stream) => {
    switch (stream.selected) {
      case true:
        dom.style.borderStyle = 'outset';
        dom.style.background = "lightgray";

        dom.className =  "stream false"
        stream.selected = false; 
        break;
      default:
        dom.style.borderStyle = 'inset'
        dom.style.background = "white";
        
        dom.className =  "stream true"        
        stream.selected = true; 
        break;
    }
  }

  handleLists = (stream) => {
    //can use stream.selected
    let streamDom = document.getElementById(stream.stream_id)

    this.handleSwitch(streamDom,stream)

    if(selectList.indexOf(stream) === -1){
      selectList.push(stream)
    }
    else {
      let index = selectList.indexOf(stream);
      selectList.splice(index,1);
    }            
  }

  handleFunctions = (e) =>{
    this.props.pointer(e)
    this.props.resetCount()
  }


  handleClick = () => {
    let selectedStreams = document.getElementsByClassName("true");
    let unSelectedStreams = document.getElementsByClassName("false");

    for (let i = 0, len = selectedStreams.length; i < len; i++) {
      selectedStreams[i].style.borderStyle = 'inset'
    }

    for (let i = 0, len = unSelectedStreams.length; i < len; i++) {
      unSelectedStreams[i].style.borderStyle = 'outset';
      unSelectedStreams[i].style.background = "lightgray"; 
    }

    this.setState({
      streamEdit: true
    })            

  } 

  handleDone = () => {
    let streams = document.getElementsByClassName("stream")
    
    for (let i = 0, len = streams.length; i < len; i++) {
      streams[i].style.borderStyle = 'none';
      streams[i].style.background = "white"; 
    }
    this.setState({
      streamEdit: false
    },function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    })  

    selectList.forEach( stream =>{
      adapter.editStream(stream.id,stream.selected,stream.user_id,stream.stream_id).then(data => data)
    })
    if (selectList.length>0){
        alert("changes saved")
    }
    selectList = [];
    
  }


  handleLoading = (id) => {
    if(this.props.loading) {
      return <div>Loading Streams...</div>
    } else {
      return <Profile userID={id} userStreams={this.props.userStreams} handleLists={this.handleLists} editClicked={this.state.streamEdit}/>
    }
  }

  render() {
    const { loading, user } = this.context;
    //const { isAuthenticated, loginWithRedirect} = this.context;
    
    if (loading || !user) {
      return <div>Loading...</div>;
    }

    if (this.state.streamEdit === true){
      return ( 
        <div className= "profile" onClick={this.handleFunctions}>
          <img src={user.picture} alt="Profile" />
          <h2>Hi, {user.name}</h2>
          <p>email: {user.email}</p>
          <Button basic loading>
            Loading
          </Button>
          <p>click the buttons below to make changes, scroll to the bottom and click done when finished.</p>
          {this.handleLoading(this.props.userId)}
          <Button className="done-button" onClick={this.handleDone} color='black'>Done</Button>
        </div>             
      );
    }
    else{
      return ( 
        <div className= "profile" onClick={this.handleFunctions}>
          <img src={user.picture} alt="Profile" />
          <h2>Hi, {user.name}</h2>
          <p>email: {user.email}</p>
          <div className= "search">
            
          </div>
          <Button onClick={this.handleClick} color='black'>Edit Streams</Button>
          {this.handleLoading(this.props.userId)}
        </div>             
      );
    }
  }
}

  const adapter = {
    editStream: (id,selected,user_id,stream_id) => {
      return fetch(`https://cors-anywhere-dd.herokuapp.com/https://river-api.herokuapp.com/users/${user_id}/user_streams/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({id,selected,user_id,stream_id}),
        headers: { "Content-Type": "application/json" },
        
      })
    .then(res => res.json())       
    },
  }
const mapDispatchToProps = state => {
  return {
    userStreams: state.StreamsReducer.streams,
    loading: state.StreamsReducer.loading
  }
}


export default connect(mapDispatchToProps, {fetchUserStreams})(ProfilePage)