import decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import auth0 from 'auth0-js';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const CLIENT_DOMAIN = process.env.AUTH0_CLIENT_DOMAIN;
const REDIRECT = process.env.AUTH0_REDIRECT;
const SCOPE = 'openid';
const AUDIENCE = process.env.AUTH0_AUDIENCE;

const auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN,
});

const getTokenExpirationDate = (encodedToken) => {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }
  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
};

const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
};

const clearIdToken = () => {
  localStorage.removeItem(ID_TOKEN_KEY);
};

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
const getParameterByName = (name) => {
  const match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

const login = () => {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE,
  });
};

const logout = () => {
  clearIdToken();
  clearAccessToken();
  browserHistory.push('/');
};

const getIdToken = () => localStorage.getItem(ID_TOKEN_KEY);

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

const isLoggedIn = () => {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
};

const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({ pathname: '/' });
  }
};


// Get and store access_token in local storage
const setAccessToken = () => {
  const accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

// Get and store id_token in local storage
const setIdToken = () => {
  const idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
};

module.exports.login = login;
module.exports.logout = logout;
module.exports.requireAuth = requireAuth;
module.exports.getIdToken = getIdToken;
module.exports.getAccessToken = getAccessToken;
module.exports.setAccessToken = setAccessToken;
module.exports.setIdToken = setIdToken;
module.exports.isLoggedIn = isLoggedIn;
