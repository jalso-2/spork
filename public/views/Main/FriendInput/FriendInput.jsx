import React, { Component } from 'react';
import Friend from '../Friend/Friend';
import PropTypes from 'prop-types';


const axios = require('axios');

class FriendInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topFive: [],
      currentText: '',
    };
    this.getPotentialFriends = this.getPotentialFriends.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clickRemovePotential = this.clickRemovePotential.bind(this);
    this.jointClickHandlers = this.jointClickHandlers.bind(this);
  }

  getPotentialFriends(value) {
    if (value.length === 0) {
      this.setState({ topFive: [] });
    } else {
      axios.get(`/get_matching_users/${value}`).then((resp) => {
        const toPage = resp.data.slice(0, 5);
        return this.setState({
          topFive: toPage,
        });
      });
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
    this.getPotentialFriends(value);
  }

  clickRemovePotential(username) {
    const newTops = this.state.topFive;
    newTops.splice(newTops.indexOf(username), 1);
    this.setState({ topFive: newTops });
  }

  jointClickHandlers(e) {
    this.props.addFriendClick(e.target.name);
    this.clickRemovePotential(e.target.name);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleInputChange}
          name="currentText"
          value={this.state.currentText}
          placeholder="username"
        />
        {(Array.isArray(this.state.topFive) && this.state.topFive.length > 0) ?
          this.state.topFive.map(person => <Friend
            clickHandler={this.jointClickHandlers}
            person={person.username}
            key={person.username}
          />) :
          ''
        }
      </div>
    );
  }
}

export default FriendInput;

FriendInput.propTypes = {
  addFriendClick: PropTypes.func.isRequired,
};
