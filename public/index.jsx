import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import makeRoutes from './routes';
import App from './containers/App/App';
// import 'bootstrap/dist/css/bootstrap.css';
// import './app.css';


const routes = makeRoutes();

const mountNode = document.querySelector('#app');
ReactDOM.render(
  <App 
    history={browserHistory}
    routes={routes}
  />,
mountNode);

