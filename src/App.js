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
    this.state = {
      currentStream: localStorage.currentStream,
      currentStreamName: localStorage.currentStreamName,
      target: "",
      sBoxOpenState: false
    }
  
  }

componentDidMount() {
}  
// recieves id from passed handler and sets as state   
  handler = (id,name) => {
    console.log("handler set ", name)
    this.setState({
      currentStream: id,
      currentStreamName: name
    }, function () {
     /* localStorage.setItem( 'currentStream', id )
      localStorage.setItem( 'currentStreamName', name )

    */})
  }

  

  UserID = (UserID) => {
    localStorage.setItem('currentUserID', UserID)
  }
  
  findTarget = (e) => {
    // access to e.target here
    let target = $(e.currentTarget)[0].className

    if (target.toString() === "searchBar" || target === "search-list"){
      console.log('open')
      this.openSBox()
    }
    else{
      console.log('closed')
      this.closeSBox()
    }
  }

  closeSBox = () =>{
    this.setState({
      sBoxOpenState: false
    })
  }

  openSBox = () =>{
    this.setState({
      sBoxOpenState: true
    })
  }
  
  render() {
    //const { isAuthenticated } = this.props.auth;
    return (
      <Router>
        <div className = "page">
          <Route exact path="/" render={() => <div><HomeBar/> <HomePage userID={this.UserID}/> </div>} />
          <Route exact path="/profile" render={() => <div ><NavBar sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <ProfilePage pointer={this.findTarget} userId={localStorage.currentUserID}/> </div>}  />
          <Route exact path='/streams' render={() => <div><NavBar sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <StreamsPage pointer={this.findTarget} handler={this.handler} /> </div>} />
          <Route exact path='/userstreams' render={() => <div><NavBar sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <UserStreamsPage pointer={this.findTarget} handler={this.handler} userId={localStorage.currentUserID}/> </div>}  />
          <Route exact path='/streams/:id/movies' render={() => <div><NavBar sBoxOpenState={this.state.sBoxOpenState} pointer={this.findTarget}/> <MoviesPage pointer={this.findTarget} handler= {localStorage.currentStream} streamName= {localStorage.currentStreamName}/> </div>} />
        </div>
      </Router>
    );
  }
}

export default App;