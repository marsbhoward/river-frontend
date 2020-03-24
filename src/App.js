import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import StreamsPage from './containers/StreamsPage';
import MoviesPage from './containers/MoviesPage';
import HomePage from './containers/HomePage';
import './index.css';


class App extends Component {  
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

 login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    console.log(this)
   // const { renewSession } = this.props.auth;

    //if (localStorage.getItem('isLoggedIn') === 'true') {
    //  renewSession();
   // }
  }

  //binds passed handler to App handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this)
    this.state = {
      currentStream: localStorage.currentStream
    }

  }
// recieves id from passed handler and sets as state   
  handler = id => {
    this.setState({
      currentStream: id
    }, function () {
      localStorage.setItem( 'currentStream', id )
    })
  }

  //function to accecpt params and save it to state 
  
  render() {
    //const { isAuthenticated } = this.props.auth;
    return (
      <Router>
        <div>
          <Route path="/" render={() => <div className="banner"> riVer</div>} />
          <Route exact path="/" render={() => <HomePage/>} />
          <Route exact path='/streams' render={() => <StreamsPage handler={this.handler} />}  />
          <Route exact path='/streams/:id/movies' render={() => <MoviesPage handler= {this.state.currentStream}/>} />
        </div>
      </Router>
    );
  }
}

export default App;