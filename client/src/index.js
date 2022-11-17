import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import spinner from './assets/images/spinner.gif'
import {icons }from './assets/icons/index'

React.icons = icons

ReactDOM.render(
  <BrowserRouter>
     <Suspense fallback={<div><img src={spinner} alt="spinner" /></div>}>
      <App></App>
       </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
