import React, { Component } from 'react';
import Friend from '../Friend/Friend';
import PropTypes from 'prop-types';

class FriendList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {console.log('this is this.props.friends', this.props.friends)}
        {this.props.friends.length ? this.props.friends.map(friend => <Friend clickHandler={this.props.removeFriendClick} person={friend} key={friend} />) : ''}
      </div>
    );
  }
}

export default FriendList;

