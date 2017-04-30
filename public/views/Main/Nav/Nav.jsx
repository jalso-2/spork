// import React from 'react';
// import { Link } from 'react-router';
// import { login, logout, isLoggedIn } from '../../../utils/AuthService';

// const Nav = () => (
//   <nav className="navbar navbar-default">
//     <div className="navbar-header">
//       <Link className="navbar-brand" to="/">Spork</Link>
//     </div>
//     <ul className="nav navbar-nav">
//       <li>
//         <Link to="/aboutus">About Us</Link>
//       </li>
//       <li>
//         {
//           (isLoggedIn()) ?
//             <Link to="/profile">My Profile</Link> :
//             ''
//         }
//       </li>
//     </ul>
//     <ul className="nav navbar-nav navbar-right">
//       <li>
//         {
//           (isLoggedIn()) ?
//             (<button
//               className="btn btn-danger log"
//               onClick={() => logout()}
//             >Log out </button>) :
//             (<button
//               className="btn btn-info log"
//               onClick={() => login()}
//             >Log In</button>)
//         }
//       </li>
//     </ul>
//   </nav>
// );

// export default Nav;
