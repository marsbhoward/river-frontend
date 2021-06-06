import React,{ useState, useEffect } from 'react';
import { useAuth0 } from "../react-auth0-spa";
import { withRouter } from 'react-router-dom'
import Searchbox from '../components/searchbox'

const NavBar  = withRouter (({ history, ...props}) => {
  const { isAuthenticated, logout } = useAuth0();
  const [count, setCount] = useState(0);
  const [darkModeValue, setDarkModeValue] = useState(props.darkmodeProp)
  const [cssColor, setCssColor] = useState("")
  
  useEffect(() => {
    setCssColor(props.css('NavBar',props.darkmodeProp))
    //used to update state when using back button
    setCount(count + 1)
  },[props.darkmodeProp]);


  function clearStream(){
    sessionStorage.setItem('currentStream', ' ');
    sessionStorage.setItem('currentStreamName', ' '); 
  }
   
  const cssStyle = {  
    position: "relative",
    'font-family': 'Alegreya Sans SC, sans-serif',
    'top': 0,
    'width': '100%',
    'font-size': '150%',
    'color': 'white',
    'font-weight': 'bold',
    'text-align': 'center',
    'display': 'flex',
    'flex-wrap': 'nowrap',
    'background': cssColor,
    'z-index':1 
    } 


    /*
      position: relative;
    font-family: "Alegreya Sans SC", sans-serif;
    top: 0px;
    width: 100%;
    font-size: 150%;
    color: white;
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    background: rgb(254, 45, 86);
    */

  
  
  /* 

  */  

  return (
  	<div className="NavBar" >
	<div style={cssStyle} className= "bannerBar" >
	    <div className="homeButton" onClick={() => {clearStream(); history.push('/') }}>  
	      RIVER
	    </div>
      <div>{sessionStorage.currentStreamName.toUpperCase()}</div>
      <Searchbox addCount={props.addCount} resetCount={props.resetCount} sBoxCount={props.sBoxCount} sBoxOpenState={props.sBoxOpenState} pointer={props.pointer}/>    
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