import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import AuthService from '../../utils/AuthService';
import Container from './Container';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import GetUserCreds from './GetUserCreds/GetUserCreds';
import MainMeal from './MainMeal/MainMeal';

const auth = new AuthService(); // Fill these in from .env

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

export const makeMainRoutes = () => (
  <Route path="/" component={Container} auth={auth}>
    <IndexRedirect to="/login" />
    <Route path="profile" component={Profile} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="get_user_creds" component={GetUserCreds} />
    <Route path="mainMeal" component={MainMeal} />
  </Route>
);

export default makeMainRoutes;
