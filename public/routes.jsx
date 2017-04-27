import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Contact from './components/views/contact';
import Profile from './components/views/profile';
import Signup from './components/views/signup';
import Login from './components/views/login';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="contact" component={Contact} />
    <Route path="profile" component={Profile} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="*" component={Home} />
  </Route>
);
