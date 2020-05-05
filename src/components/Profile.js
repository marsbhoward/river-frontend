import React, { Component } from 'react';
import { useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";
import UserStream from '../components/UserStream';


export class Profile extends Component {
  

  componentDidMount() {
  }


  render() {    
    const streamsList = this.props.userStreams.map((stream,index) => {

      return <UserStream key={index} stream={stream} handleLists={this.props.handleLists} editClicked={this.props.editClicked}/>
    })
    
    return (
      <div className="streams-list-2">
          {streamsList}
      </div>
    )
  }
}


export default Profile;