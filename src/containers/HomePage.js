import React,{ useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movieActions'
import {  useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { useAuth0 } from "../react-auth0-spa";
import { useHistory } from "react-router-dom";

  const streamsList = [
  {id: 1,name:"netflix"},{id: 2,name:"hulu"},{id: 3,name:"amazon"},{id: 4,name:"hbo"},
  {id: 5,name:"disney"},{id: 6,name:"showtime"},{id: 7,name:"starz"},{id: 8,name:"cinimax"},
  {id: 9,name:"dc"},{id: 10,name:"apple"},{id: 11,name:"epix"},{id: 12,name:"tbs"},
  {id: 13,name:"tnt"},{id: 14,name:"shudder"},{id: 15,name:"amc"},{id: 16,name:"fx"},
  {id: 17,name:"syfy"},{id: 18,name:"ifc"},{id: 19, name:"peacock"},{id: 20, name:"paramount"}
  ]

function HomePage(props) {  
  const dispatch = useDispatch();
  const { isAuthenticated, loginWithRedirect} = useAuth0();
  const { loading, user } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (props.homeCount <= 0){
      console.log('done')
      console.log(props.homeCount)
      props.addHomeCount()
      streamsList.forEach(stream =>{
        dispatch(fetchMovies(stream.id));
      })
    }
  },[])


  let stlyes = {
    backgroundImage: "url('https://raw.githubusercontent.com/marsbhoward/river-frontend/master/src/streams_logos/streamsBackground.png')",
  }

  function handleClick() {
    history.push("/streams");    
    adapter.createUser(`user.email ${Date.now()} `,"guest").then(res=> {});
  }


  if (loading) {
    sessionStorage.setItem('currentStreamName', ' '); 
    return <div className = "home">Loading...</div>;
  }

 
    return (
    <div>
        <div className = "home" style={stlyes}>
        {!isAuthenticated && (
          <div className = "home-col"> 
          </div>
           )}
           {!isAuthenticated && (
          <div className = "home-col-2"> 
            <h1>Find Your Streams</h1>
            <p> 
              River is the pathway to all of your streaming platforms.
              create an account and you will be able to browse your selected providers 
              movie catalogs, or you can click the streams button to view all available platforms. 
              <br/><br/>Select a movie and you can get the trailer, ratings, and more! 
            </p>
      
            <Button.Group>
              <Button primary onClick={() => loginWithRedirect({})}>Log In</Button>
              <Button.Or />
              <Button secondary onClick={handleClick}>See Streams</Button>
            </Button.Group>            
          </div>
          
        )}    
      </div>
      <div>
         {isAuthenticated && (
            adapter.createUser(user.email,user.name).then(res=> {
              user.id = res.id
              getUserStreams(user.id)
              props.userInfo(user.id,res.darkmode)
            }),            
            <div className="greeting">
              <h2> Hi {user.name} </h2>
              <h4> Please wait to be redirected </h4>
            </div>,
            history.push('/profile')
        )}     
      </div>
    </div>
    );
  }

  function getUserStreams(userID){
    streamsList.forEach(stream =>{ 
      adapter.createUserStream(userID,stream.id).then(res=> {
      })
    })  
  }

  const adapter = {
    createUser: (email,username) => {
      return fetch(`https://cors-anywhere-dd.herokuapp.com/https://river-api.herokuapp.com/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, username})
      })
    .then(res => res.json())       
    },

    createUserStream: (user_id,stream_id) => {
      return fetch(`https://cors-anywhere-dd.herokuapp.com/https://river-api.herokuapp.com/users/${user_id}/user_streams`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, stream_id})
      })
    .then(resp => resp.json())       
    }
  }


  const mapDispatchToProps = state => {
    return {
      loading: state.MoviesReducer.loading
    }
  }


export default connect(mapDispatchToProps, {fetchMovies})(HomePage)