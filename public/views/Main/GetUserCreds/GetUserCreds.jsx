/* global localStorage */
import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import Nav from '../Nav/Nav';


const axios = require('axios');

class GetUserCreds extends Component {
  constructor() {
    super();
    this.state = {
      textEmail: '',
      textPhone: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser() {
    axios.get(`/get_user/${JSON.parse(localStorage.profile).nickname}`).then((response) => {
      const userChanged = response.data;
      userChanged.phoneNumber = this.state.textPhone;
      axios.put('/update_user', userChanged).then(result => result);
    });
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div>
        <Nav navBar={this.props} />
        <form>
          <input type="text" onChange={this.handleChange} name="textPhone" value={this.state.textPhone} placeholder="phone number (no dashes/spaces)" />
          <Button bsStyle="info" onClick={this.updateUser} type="button" >Update My Credentials</Button>
        </form>
      </div>
    );
  }
}

export default GetUserCreds;
