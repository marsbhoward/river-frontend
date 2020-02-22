import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from '../components/Home';
import Streams from '../components/Streams';
import Movies from '../components/Movies';




const App = (props) => {
  return (
    <Router>
      <div className="app">
      <Route exact path="/" component={Home} />
      <Route exact path="/streams" component={Streams} />
      <Route exact path="/streams/movies" component={Movies} />
      </div>
    </Router> 
  );
};

export default App