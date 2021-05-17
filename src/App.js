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
    this.darkModeSwitch = this.darkModeSwitch.bind(this)

    this.state = {
      currentStream: sessionStorage.currentStream,
      currentStreamName: sessionStorage.currentStreamName,
      target: "",
      sBoxOpenState: false,
      sBoxCount: 0,
      homeCount: 0,
      stylePath: './index.css'
    }
    
  }

componentDidMount() {
  sessionStorage.setItem ('AllMovies', 'not loaded')
}  

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

  darkModeSwitch = (user) => {
    if (user.darkmode === false){
      this.setState ({stylePath: './index.css'})
    }
    else{
      //this.setState ({stylePath: 'darkmode css file'})
    }
  }
  

  UserID = (UserID) => {
    sessionStorage.setItem('currentUserID', UserID)
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
  
  render() {
    //const { isAuthenticated } = this.props.auth;
    return (
      <Router>
        <div className = "page">
        <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
          <Route exact path="/" render={() => <div><HomeBar/> <HomePage homeCount={this.state.homeCount} addHomeCount={this.addHomeCount} userID={this.UserID}/> </div>} />
          <Route exact path="/profile" render={() => <div ><NavBar addCount={this.addCount} resetCount={this.resetCount} sBoxCount={this.state.sBoxCount} sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <ProfilePage resetCount={this.resetCount} darkModeSwitch = {this.darkModeSwitch} pointer={this.findTarget} userId={sessionStorage.currentUserID}/> </div>}  />
          <Route exact path='/streams' render={() => <div><NavBar addCount={this.addCount} resetCount={this.resetCount} sBoxCount={this.state.sBoxCount} sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <StreamsPage resetCount={this.resetCount} pointer={this.findTarget} handler={this.handler} /> </div>} />
          <Route exact path='/userstreams' render={() => <div><NavBar addCount={this.addCount} resetCount={this.resetCount} sBoxCount={this.state.sBoxCount} sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <UserStreamsPage resetCount={this.resetCount} pointer={this.findTarget} handler={this.handler} userId={sessionStorage.currentUserID}/> </div>}  />
          <Route exact path='/streams/:id/movies' render={() => <div><NavBar addCount={this.addCount} resetCount={this.resetCount} sBoxCount={this.state.sBoxCount} sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <MoviesPage resetCount={this.resetCount} pointer={this.findTarget} handler= {this.state.currentStream} streamName= {this.state.currentStreamName}/> </div>} />
        </div>
      </Router>
    );
  }
}

export default App;