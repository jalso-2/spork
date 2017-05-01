import React from 'react';
import { Link } from 'react-router';
// import { login, logout, isLoggedIn } from '../../../utils/AuthService';

const Nav = () => (
  <nav className="navbar navbar-default">
    <div className="navbar-header">
      <Link className="navbar-brand" to="/profile">Spork</Link>
    </div>
    <ul className="nav navbar-nav">
      <li>
        <Link to="/mainMeal">Meal Hunter</Link>        
      </li>
    </ul>
    <ul className="nav navbar-nav ">
      <li>
        <Link to="/get_user_creds">Update Info</Link>        
      </li>
    </ul>
  </nav>
);

export default Nav;
// <Link to="/aboutus">About Us</Link>
// {
//           (isLoggedIn()) ?
//             <Link to="/profile">My Profile</Link> :
//             ''
//         }



// {
        //   (isLoggedIn()) ?
        //     (<button
        //       className="btn btn-danger log"
        //       onClick={() => logout()}
        //     >Log out </button>) :
        //     (<button
        //       className="btn btn-info log"
        //       onClick={() => login()}
        //     >Log In</button>)
        // }