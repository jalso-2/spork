import React from 'react'
import {Button} from 'react-bootstrap'
import AuthService from '../../../utils/AuthService'

export class Home extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    };
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    });
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div>
        <h2>Home</h2>
        {console.log(profile)}
        <p>Welcome {profile.name}!</p>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;
