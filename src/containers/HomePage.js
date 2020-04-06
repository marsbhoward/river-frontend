import React from 'react';
import { useAuth0 } from "../react-auth0-spa";

const HomePage = () => {  
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { loading, user } = useAuth0();
  let stlyes = {
    backgroundImage: "url('https://raw.githubusercontent.com/marsbhoward/river-frontend/master/src/streams_logos/streamsBackground.png')",
    backgroundSize: "360px 230px",
  }


  if (loading) {
    return <div className = "home">Loading...</div>;
  }

 
    return (
      <div className = "home" style={stlyes}>
        <div className = "home-col"> 
        </div>
      {!isAuthenticated && (
        <div className = "home-col-2"> 
          <h1>Welcome to River</h1>
          <h2> 
            River is the pathway to all of your streaming platforms.
            create an account and you will be able to browse your selected providers 
            movie catalogs. Select a movie and you can get the trailer, ratings, and more! 
          </h2>
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        </div>
        
      )}
       {isAuthenticated && (
       
        <h2>Hi {user.name}</h2>
       
      )}     
    </div>
    );
  }

export default HomePage

