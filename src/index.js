import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import StreamsReducer from './reducers/streamsReducer';
import MoviesReducer from './reducers/moviesReducer';


import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const store = createStore(combineReducers({
	MoviesReducer,
	StreamsReducer
}),
 applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>, document.getElementById('root')
)


