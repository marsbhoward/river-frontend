import React, { Component } from 'react';
import { useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";
import UserStream from '../components/UserStream';


import netflix from'../streams_logos/netflix.png';
import hulu from'../streams_logos/hulu.png';
import amazon from'../streams_logos/amazon.png';
import hbo from'../streams_logos/hbo.png';
import disney from'../streams_logos/disney.png';
import showtime from'../streams_logos/showtime.png';
import starz from'../streams_logos/starz.png'
import cinimax from'../streams_logos/cinimax.png'
import dc from'../streams_logos/dc.png'
import apple from'../streams_logos/apple.png'
import epix from'../streams_logos/epix.png'
import cbs from'../streams_logos/cbs.png'
import tbs from'../streams_logos/tbs.png'
import tnt from'../streams_logos/tnt.png'
import shudder from'../streams_logos/shudder.png'
import amc from'../streams_logos/amc.png'
import fx from'../streams_logos/fx.png'
import syfy from'../streams_logos/syfy.png'
import ifc from'../streams_logos/ifc.png'



export class Profile extends Component {
  

  componentDidMount() {
    console.log(this)
  }


  render() {    
    const streamsList = this.props.userStreams.map((stream,index) => {

      return <UserStream key={index} stream={stream}/>
    })
    
    return (
      <div className="streams-list">
          {streamsList}
      </div>
    )
  }
}


export default Profile;