import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { withRouter } from 'react-router-dom'
import Searchbox from '../components/searchbox'

const NavBar = withRouter(({ history }) => {
  const { isAuthenticated, logout } = useAuth0();

  function clearStream(){
    localStorage.setItem('currentStream', ' ');
    localStorage.setItem('currentStreamName', ' '); 
  }

  return (
  	<div className="NavBar">
	<div className="bannerBar">
	    <div className="homeButton" onClick={() => {clearStream(); history.push('/') }}>  
	      RIVER
	    </div>
      <div>{localStorage.currentStreamName.toUpperCase()}</div>
      <Searchbox/>      
	</div>

    <div className="footer">
      {isAuthenticated && <span className="profileButton" onClick={() => {clearStream(); history.push('/profile') }}>Profile</span>}
      {isAuthenticated && <span className="streamsButton" onClick={() => {clearStream(); history.push('/userstreams') }}>Streams</span>}
      {isAuthenticated && <span className="logoutButton" onClick={() => logout()}>Log Out</span>}    
           
    </div>
    </div>
  );
	});

export default NavBar;