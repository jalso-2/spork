import React, { Component } from 'react';
import FriendMeal from '../FriendMeal/FriendMeal';
//get db to gather friends....

class FriendListMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      checkedFriends: [],
    };
    this.friendListFriendClick = this.friendListFriendClick.bind(this);
  }
  getAllFriends() {
    //axios request to get friends...may want to passs down from mealMatcher
  }
  friendListFriendClick() {
    console.log(this);
    //should go ahead and remove the person from checkedFriends with this.setState

  }
  render() {
    const friendList = [{ username: 'mike' }, { username: 'mikey' }, { username: 'mikeal' }];
    return (
      <div>
        {friendList.map(friend =>
          <FriendMeal
            friendListFriendClick={this.friendListFriendClick}
            mealMatcherFriendClick={this.props.mealMatcherFriendClick}
            username={friend.username}
            key={friend.username}
          />,
        )}
      </div>
    );
  }
}

export default FriendListMeal;
