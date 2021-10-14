import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";

import StreamsReducer from './reducers/streamsReducer';
import MoviesReducer from './reducers/moviesReducer';
import TrailersReducer from './reducers/trailersReducer';



import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


let rootReducer
const store = createStore(rootReducer = (combineReducers({
	MoviesReducer,
	StreamsReducer,
	TrailersReducer
})),
 applyMiddleware(thunk));

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
  <Provider store={store} >
    <App />
  </Provider>
    </Auth0Provider>, 
  document.getElementById('root')
)


