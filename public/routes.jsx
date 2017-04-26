import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Contact from './components/views/contact';
import Profile from './components/views/profile';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="contact" component={Contact} />
    <Route path="profile" component={Profile} />
    <Route path="*" component={Home} />
  </Route>
);
