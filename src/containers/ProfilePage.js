import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStreams } from '../actions/userStreamActions'
import Profile from '../components/Profile';
import { Auth0Context } from "../react-auth0-spa";
import { Fragment } from "react";



class ProfilePage extends Component {
 static contextType = Auth0Context;  
  
  componentDidMount() {
    console.log(this)
    this.props.fetchUserStreams(this.props.userId)
  }

  componentDidUpdate(prevProps){
  }

  fetchUserStreams = (id) => {
    this.setState({
      userID: id
    })
  }

  handleClick = () => {

  }

  handleLoading = (id) => {
    if(this.props.loading) {
      return <div>Loading Streams...</div>
    } else {
      return <Profile userID={id} userStreams={this.props.userStreams}/>
    }
  }

  render() {
    const { loading, user } = this.context;
    const { isAuthenticated, loginWithRedirect} = this.context;
    
    if (loading || !user) {
      return <div>Loading...</div>;
    }

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

const mapDispatchToProps = state => {
  return {
    userStreams: state.StreamsReducer.streams,
    loading: state.StreamsReducer.loading
  }
}

export default connect(mapDispatchToProps, {fetchUserStreams})(ProfilePage)