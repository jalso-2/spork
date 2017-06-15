import React, { Component } from 'react';

class FriendMeal extends Component {
  constructor(props) {
    super(props);
    this.handleAllClicks = this.handleAllClicks.bind(this);
  }
  handleAllClicks() {
    this.props.friendListFriendClick();
    this.props.mealMatcherFriendClick();
  }
  render() {
    return (
      <div>
        <input type="checkbox" onClick={this.props.handleAllClicks} />
        <h4>{this.props.username}</h4>
      </div>
    );
  }
}

export default FriendMeal;
