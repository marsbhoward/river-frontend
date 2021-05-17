import React from 'react';
import { useAuth0 } from "../react-auth0-spa";
import { useHistory } from "react-router-dom";



function User(props) {  
 const history = useHistory();	
 const { isAuthenticated} = useAuth0();	
 return (
    <div>
   	  {!isAuthenticated && (
          <h1> "Not Authenticated"</h1>, 
          history.push('/')
       )}
    </div>
 )
           
}
export default User