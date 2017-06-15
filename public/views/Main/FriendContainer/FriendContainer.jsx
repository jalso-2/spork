import React, { Component } from 'react';
import FriendList from '../FriendList/FriendList';
import FriendInput from '../FriendInput/FriendInput';

const axios = require('axios');

class FriendContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: JSON.parse(localStorage.profile).nickname,
      friends: [],
    };
    this.getFriends();
    this.addFriendClick = this.addFriendClick.bind(this);
    this.removeFriendClick = this.removeFriendClick.bind(this);
  }

  getFriends() {
    axios.get(`/get_user/${this.state.nickname}`).then((resp) => {
      console.log(resp, 'resp')
      this.setState({ friends: resp.data.friendsList || [] });
    });
      console.log(this.state.friends, 'friends');
    this.render();
  }

  addFriendClick(username) {
    console.log('hello');
    console.log(this.state.nickname)
    console.log(username)
    console.log(event, 'event');
    // add to both people
    axios.post('/add_friend', { body: [this.state.nickname, username] })
      .then( response => console.log(response, 'response'));
    this.getFriends();
  }

  removeFriendClick(event) {
    console.log('hello0');
    //remove from both people
    axios.all([
      axios.get(`/get_user/${this.state.nickname}`),
      axios.get(`/get_user/${event.target.username}`),
    ]).then((get1, get2) => {
      const userToChange = get1;
      const oldFriendToChange = get2;
      userToChange.friendsList.splice(userToChange.friendsList.indexOf(oldFriendToChange.username), 1);
      oldFriendToChange.friendsList.splice(oldFriendToChange.friendsList.indexOf(userToChange.username), 1);
    }).then((userToChange, oldFriendToChange) => {
      axios.all([
        axios.put('/update_user', userToChange),
        axios.put('/update_user', oldFriendToChange),
      ]).then(axios.spread((update1, update2) => {
        console.log(update1, update2);
        this.setState({ friends: update1.data.friendsList });
      }));
    });
    this.getFriends();
  }

  render() {
    return (
      <div>
        <FriendInput addFriendClick={this.addFriendClick} profile={this.state.friends}/>
        <FriendList friends={this.state.friends} removeFriendClick={this.removeFriendClick} />
      </div>
    );
  }
}

export default FriendContainer;
