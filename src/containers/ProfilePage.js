import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStreams } from '../actions/userStreamActions'
import Profile from '../components/Profile';
import { Auth0Context } from "../react-auth0-spa";
import { Fragment } from "react";


let editList = [] 
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
  }

  fetchUserStreams = (id) => {
    this.setState({
      userID: id
    })
  }

  handleLists = (id) => {
    let selectedStream = document.getElementById(id)
    //adds stream id to list of values to be changed on api
    if(editList.indexOf(id) === -1) {
      editList.push(id)
      //edits the button visual
      if (selectedStream.className === "stream true"){
        selectedStream.style.borderStyle = 'outset';
        selectedStream.background = "lightgray"; 
      }
      else{
        selectedStream.style.borderStyle = 'inset'
        selectedStream.background = "white"; 
      }
    }
    else{
    //removes stream id from list of values if clicked again before done  
      let index = editList.indexOf(id);
      editList.splice(index,1);
      //reverts button visual to default
        if (selectedStream.className === "stream true"){
          selectedStream.style.borderStyle = 'inset'
          selectedStream.background = "white"; 
        }
        else{
          selectedStream.style.borderStyle = 'outset';
          selectedStream.background = "lightgray";
        }
      }
  }
  handleClick = () => {
    let selectedStreams = document.getElementsByClassName("true");
    let unSelectedStreams = document.getElementsByClassName("false");

    for (let i = 0, len = selectedStreams.length; i < len; i++) {
      selectedStreams[i].style.borderStyle = 'inset'
    }

    for (let i = 0, len = unSelectedStreams.length; i < len; i++) {
      unSelectedStreams[i].style.borderStyle = 'outset';
      unSelectedStreams[i].background = "lightgray"; 
    }

    this.setState({
      streamEdit: true
    })            

  } 

  handleDone = () => {
    let streams = document.getElementsByClassName("stream")
    
    for (let i = 0, len = streams.length; i < len; i++) {
      streams[i].style.borderStyle = 'none';
      streams[i].background = "white"; 
    }
    this.setState({
      streamEdit: false
    }) 

    //add method that edits backend here       
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
    const { isAuthenticated, loginWithRedirect} = this.context;
    
    if (loading || !user) {
      return <div>Loading...</div>;
    }

    if (this.state.streamEdit == true){
      return ( 
        <div className= "profile">
          <img src={user.picture} alt="Profile" />
          <h2>Hi, {user.name}</h2>
          <p>email: {user.email}</p>
          <button onClick={this.handleClick}>Edit Streams</button>
          {this.handleLoading(this.props.userId)}
          <button className="done-button" onClick={this.handleDone}>Done</button>
        </div>             
      );
    }
    else{
      return ( 
        <div className= "profile">
          <img src={user.picture} alt="Profile" />
          <h2>Hi, {user.name}</h2>
          <p>email: {user.email}</p>
          <button onClick={this.handleClick}>Edit Streams</button>
          {this.handleLoading(this.props.userId)}
        </div>             
      );
    }
  }
}

const mapDispatchToProps = state => {
  return {
    userStreams: state.StreamsReducer.streams,
    loading: state.StreamsReducer.loading
  }
}

export default connect(mapDispatchToProps, {fetchUserStreams})(ProfilePage)