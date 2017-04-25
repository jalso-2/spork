import React from 'react';
import { Link, IndexLink } from 'react-router';

const App = props => (
  <div>
    <nav>
      <li><IndexLink to="/">Home</IndexLink></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </nav>
    {props.children}
  </div>
);

export default App;
