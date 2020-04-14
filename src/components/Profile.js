import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

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



const Profile = () => {
  const { loading, user } = useAuth0();

  const streamsList = [
  {name:"netflix",img: netflix},{name:"hulu",img: hulu},{name:"amazon",img: amazon},
  {name:"hbo",img: hbo},{name:"disney",img: disney},{name:"showtime",img: showtime},
  {name:"starz",img: starz},{name:"cinimax",img: cinimax},{name:"dc",img: dc},
  {name:"apple",img: apple},{name:"epix",img: epix},{name:"cbs",img: cbs},
  {name:"tbs",img: tbs},{name:"tnt",img: tnt},{name:"shudder",img: shudder},
  {name:"amc",img: amc},{name:"fx",img: fx},{name:"syfy",img: syfy},{name:"ifc",img: ifc}
  ]


  function handleClick() {
    
  }  

    const lists = streamsList.map((stream, index) => {
      return <img key={index} className= "stream2" alt={stream.name} src={stream.img}/>
    })
  if (loading || !user) {
    return <div>Loading...</div>;
  }


  return (
  <div className = "profile">
    <Fragment>
      <img src={user.picture} alt="Profile" />
      <h2>Hi, {user.name}</h2>
      <p>email: {user.email}</p>
      <button onClick={handleClick}>Edit Streams</button>
    </Fragment>
    <div className="streams-list">
      {lists}
    </div>
  </div>
  );
};

export default Profile;