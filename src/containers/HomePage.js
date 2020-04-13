import React from 'react';
import { useAuth0 } from "../react-auth0-spa";
import { useHistory } from "react-router-dom";

function HomePage() {  
  const { isAuthenticated, loginWithRedirect} = useAuth0();
  const { loading, user } = useAuth0();
  const history = useHistory();
  let stlyes = {
    backgroundImage: "url('https://raw.githubusercontent.com/marsbhoward/river-frontend/master/src/streams_logos/streamsBackground.png')",
  }

  function handleClick() {
    history.push("/streams");
  }


  if (loading) {
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
            <button onClick={() => loginWithRedirect({})}>Log in</button>
            <button onClick={handleClick}>Streams</button>
          </div>
          
        )}    
      </div>
      <div>
         {isAuthenticated && (
            adapter.createUser(user.email,user.name).then(res=> {
            }),
            <div className="greeting">
              <h2> Hi {user.name} </h2>
            </div>
        )}     
      </div>
    </div>
    );
  }

  const adapter = {
    createUser: (email,username) => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://river-api.herokuapp.com/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, username})
      })
    .then((res) => res.json())       
    }
  }



export default HomePage

