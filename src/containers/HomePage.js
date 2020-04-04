import React, { Component } from 'react';
import { useAuth0 } from "../react-auth0-spa";

const HomePage = () => {  
   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  	  const { loading, user } = useAuth0();


  if (loading) {
    return <div className = "home">Loading...</div>;
  }
 
    return (
      <div className = "home">
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}
       {isAuthenticated && (
       
        <h2>Hi {user.name}</h2>
       
      )}     
    </div>
    );
  }

export default HomePage

