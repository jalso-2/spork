import React, { Component } from 'react';

const axios = require('axios');

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      phone: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickBtn = this.handleClickBtn.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClickBtn() {
    axios.post('/test_user', {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone,
    })
    .then((res) => {
      console.log(res, 'successful');
      // this.setState({ password: '' });
      // this.setState({ phone: '' });
      // this.setState({ email: '' });
      // this.setState({ username: '' });
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div id="signup">
        <div>
          This is the signup page.
        </div>
        <br />
        <form>
          <input
            onChange={this.handleInputChange}
            name="email"
            type="text"
            value={this.state.email}
            placeholder="email"
          />
          <br />
          <input
            onChange={this.handleInputChange}
            name="password"
            type="text"
            value={this.state.password}
            placeholder="password"
          />
          <br />
          <input
            onChange={this.handleInputChange}
            name="username"
            type="text"
            value={this.state.username}
            placeholder="username"
          />
          <br />
          <input
            onChange={this.handleInputChange}
            name="phone"
            type="text"
            value={this.state.phone}
            placeholder="phone number (no hyphens)"
          />
          <br />
          <button onClick={this.handleClickBtn} type="button" > Sign Up </button>
        </form>
      </div>
    );
  }
}


export default Signup;
