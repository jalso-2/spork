import React, { Component } from 'react';
import Friend from '../Friend/Friend';
//get db to gather friends....

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    console.log(this);
  }

  render() {
    const friendList = [{ username: 'mike' }, { username: 'mikey' }, { username: 'mikeal' }];
    return (
      <div>
       {friendList.map(friend => <Friend clickHandler={this.clickHandler} username={friend.username} key={friend.username} />)}
      </div>
    );
  }
}

export default FriendList;



