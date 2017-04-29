import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Callback from './views/Main/Callback/Callback';
import { requireAuth } from './utils/AuthService';
import Login from './views/Main/Login/Login';
import Profile from './views/Main/Profile/Profile';
import Home from './views/Main/Home/Home';

const App = () => (
  <div className="container">
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} onEnter={requireAuth} />
      <Route path="/callback" component={Callback} />
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
