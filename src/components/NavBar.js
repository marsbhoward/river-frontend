import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'

const NavBar = withRouter(({ history }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
  	<div className="NavBar">
	<div className="banner">
	    <span className="homeButton" onClick={() => { history.push('/') }}>  
	      RIVER
	    </span> 	
	</div>

    <div className="footer">
      {isAuthenticated && <span className="logoutButton" onClick={() => logout()}>Log out</span>}
      {isAuthenticated && (
	    <span className="profileButton" onClick={() => { history.push('/profile') }}>  
	      Profile
	    </span>
      )}    
           
    </div>
    </div>
  );
	});

export default NavBar;