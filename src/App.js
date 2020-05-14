import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import NavBar from './components/NavBar';
import ProfilePage from './containers/ProfilePage';
import StreamsPage from './containers/StreamsPage';
import UserStreamsPage from './containers/UserStreamsPage';
import MoviesPage from './containers/MoviesPage';
import HomePage from './containers/HomePage';
import './index.css';



class App extends Component {  
  //binds passed handler to App handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this)
    this.state = {
      currentStream: localStorage.currentStream,
      currentStreamName: localStorage.currentStreamName
    }
  
  }
// recieves id from passed handler and sets as state   
  handler = (id,name) => {
    this.setState({
      currentStream: id,
      currentStreamName: name
    }, function () {
      localStorage.setItem( 'currentStream', id )
      localStorage.setItem( 'currentStreamName', name )
    })
  }

  UserID = (UserID) => {
    localStorage.setItem('currentUserID', UserID)
  }
  
  
  render() {
    //const { isAuthenticated } = this.props.auth;
    return (
      <Router>
        <div className = "page">
          <Route path="/" render={() => <NavBar/> } />
          <Route exact path="/" render={() => <HomePage userID={this.UserID}/>} />
          <Route exact path="/profile" render={() => <ProfilePage userId={localStorage.currentUserID}/>} />
          <Route exact path='/streams' render={() => <StreamsPage handler={this.handler} />}  />
          <Route exact path='/userstreams' render={() => <UserStreamsPage handler={this.handler} userId={localStorage.currentUserID}/>}  />
          <Route exact path='/streams/:id/movies' render={() => <MoviesPage handler= {this.state.currentStream} streamName= {this.state.currentStreamName}/>} />
        </div>
      </Router>
    );
  }
}

export default App;