import React from 'react';
import { Button } from 'react-bootstrap';
import AuthService from '../../../utils/AuthService';

export class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: props.auth.getProfile(),
    };
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile });
    });
  }

  logout() {
    this.props.auth.logout();
    this.props.router.push('/login');
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        <h2>Home</h2>
        {console.log(profile)}
        <p>Welcome {profile.name}!</p>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    );
  }
}

import Nav from '../Nav/Nav';

const Home = () => (
  <div>
    <Nav />
    <h2>Got this one!</h2>
  </div>
);


export default Home;
