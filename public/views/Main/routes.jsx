import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import AuthService from '../../utils/AuthService';
import Container from './Container';
import Login from './Login/Login';
import Profile from './Profile/Profile';

// import Env from '../../../.env';

const auth = new AuthService('AUTH0_CLIENT_ID', 'AUTH0_DOMAIN'); // Fill these in from .env

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

export const makeMainRoutes = () => (
  <Route path="/" component={Container} auth={auth}>
    <IndexRedirect to="/home" />
    <Route path="profile" component={Profile} onEnter={requireAuth} />
    <Route path="login" component={Login} />
  </Route>
);

export default makeMainRoutes;
