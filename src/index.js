import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

import './index.css';
import * as serviceWorker from './serviceWorker';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

render (
  <App />,
  document.getElementById('root')
);
