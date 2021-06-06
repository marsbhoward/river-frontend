import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import NavBar from './components/NavBar';
import HomeBar from './components/HomeBar';
import ProfilePage from './containers/ProfilePage';
import StreamsPage from './containers/StreamsPage';
import UserStreamsPage from './containers/UserStreamsPage';
import MoviesPage from './containers/MoviesPage';
import HomePage from './containers/HomePage';
import './index.css';
import $ from 'jquery'; 



class App extends Component {  
  
  constructor(props){
    super(props)
    //binds passed handler to App handler
    this.handler = this.handler.bind(this)
    this.closeSBox = this.closeSBox.bind(this)
    this.openSBox= this.openSBox.bind(this)
    this.addCount=this.addCount.bind(this)
    this.resetCount=this.resetCount.bind(this)
    this.addHomeCount=this.addHomeCount.bind(this)
    this.UserInfo= this.UserInfo.bind(this)
    this.updateDarkmode = this.updateDarkmode.bind(this)
    
    this.state = {
      currentStream: sessionStorage.currentStream,
      currentStreamName: sessionStorage.currentStreamName,
      target: "",
      sBoxOpenState: false,
      sBoxCount: 0,
      homeCount: 0,
      darkmode: false
    }
    
  }

componentDidMount() {
  sessionStorage.setItem ('AllMovies', 'not loaded')
}  

/*
componentDidUpdate(){
  console.log(this)
}
*/

// recieves id from passed handler and sets as state   
  handler = (id,name) => {
    console.log("handler set ", name)
    this.setState({
      currentStream: id,
      currentStreamName: name
    }, function () {
     /* sessionStorage.setItem( 'currentStream', id )
      sessionStorage.setItem( 'currentStreamName', name )

    */})
  }


  UserInfo = (UserID,darkmode) => {
    sessionStorage.setItem('currentUserID', UserID)
    sessionStorage.setItem('darkmode', darkmode)
    this.setState({darkmode: darkmode})
  }

  updateDarkmode = (darkmode) =>{
    this.setState({darkmode: darkmode})
  }
  
  findTarget = (e) => {
    // access to e.target here
    let target = $(e.currentTarget)[0].className
    
    if (target.toString() === "searchBar" || target === "search-list"){
      this.openSBox()
    }
    else{
      this.closeSBox()
    }
  }

  addHomeCount(){
    this.setState({
      homeCount: this.state.homeCount+1
    })
  }

  closeSBox() {
    
    this.setState(state =>({
      sBoxOpenState: false
    }))
  }

  openSBox() {
    
    this.setState(state =>({
      sBoxOpenState: true
    }))
  }

  resetCount(){
      this.setState({
        sBoxCount: 0
      })
  }

  addCount(){
    this.setState({
      sBoxCount: this.state.sBoxCount+1
    })
}

  cssSwitch(component,darkmode){
    let background 
    //let color
    switch (component) {
      case 'NavBar':
        if (darkmode === false){
          background = '#fe2d56'
        }
        else{
          background = '#202125'
        }
        break;
      case 'Profile':
      case 'UserStreams':
      case 'Movies':
      case 'Page':
        if (darkmode === false){
          background = '#ffffff'
          //color = black
        }
        else{
          background = '#333438'
          //color = 'white'
        }
      break;
      case 'Info':
        if (darkmode === false){
          background = 'linear-gradient(#fe2d56,white, white)';
          //color= 'black'
        }
        else{
          background = 'linear-gradient(lightgray,#333438, #333438)'
          //color = 'black'
        }
        break;      
    
      default:
        break;
    }

    return background
  }
  

  render() {
    //const { isAuthenticated } = this.props.auth;
    let pageCss = this.cssSwitch("Page", this.state.darkmode)
    return (
      <Router>
        <div style={{background:pageCss}}  className = "page">
          <Route exact path="/" render={() => <div><HomeBar/> <HomePage homeCount={this.state.homeCount} addHomeCount={this.addHomeCount} userInfo={this.UserInfo}/> </div>} />
          <Route exact path="/profile" render={() => <div ><NavBar darkmodeProp = {this.state.darkmode} css={this.cssSwitch} addCount={this.addCount}  resetCount={this.resetCount} sBoxCount={this.state.sBoxCount} sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <ProfilePage css={this.cssSwitch} darkmodeProp = {this.state.darkmode} updateDarkmode = {this.updateDarkmode} resetCount={this.resetCount} pointer={this.findTarget} userId={sessionStorage.currentUserID}/> </div>}  />
          <Route exact path='/streams' render={() => <div><NavBar darkmodeProp = {this.state.darkmode} css={this.cssSwitch} addCount={this.addCount} resetCount={this.resetCount} sBoxCount={this.state.sBoxCount} sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <StreamsPage css={this.cssSwitch} darkmodeProp = {this.state.darkmode} resetCount={this.resetCount} pointer={this.findTarget} handler={this.handler} /> </div>} />
          <Route exact path='/userstreams' render={() => <div><NavBar darkmodeProp = {this.state.darkmode} css={this.cssSwitch} addCount={this.addCount} resetCount={this.resetCount} sBoxCount={this.state.sBoxCount} sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <UserStreamsPage css={this.cssSwitch} darkmodeProp = {this.state.darkmode} resetCount={this.resetCount} pointer={this.findTarget} handler={this.handler} userId={sessionStorage.currentUserID}/> </div>}  />
          <Route exact path='/streams/:id/movies' render={() => <div><NavBar darkmodeProp = {this.state.darkmode} css={this.cssSwitch} addCount={this.addCount} resetCount={this.resetCount} sBoxCount={this.state.sBoxCount} sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <MoviesPage css={this.cssSwitch} darkmodeProp = {this.state.darkmode} resetCount={this.resetCount} pointer={this.findTarget} handler= {this.state.currentStream} streamName= {this.state.currentStreamName}/> </div>} />
        </div>
      </Router>
    );
  }
}

export default App;