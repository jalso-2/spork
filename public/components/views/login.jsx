import React, { Component } from 'react';

const axios = require('axios');

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickBtn = this.handleClickBtn.bind(this);
  }

  handleClickBtn() {
    axios.post('/test_user', {
      email: this.state.email,
      password: this.state.password,
    })
    .then((res) => {
      console.log(res, 'successful');
      // this.setState(this.state.password, '');
      // this.setState(this.state.email, '');
    })
    .catch(err => console.error(err));
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div id="login">
        <div>
          This is the login page.
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
          <input
            onChange={this.handleInputChange}
            name="password"
            type="text"
            value={this.state.password}
            placeholder="password"
          />
          <button onClick={this.handleClickBtn} type="button" > Log In </button>
        </form>
      </div>
    );
  }
}

export default Login;
