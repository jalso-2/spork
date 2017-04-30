import React, { Component } from 'react';
import Need from '../Need/Need';

class NeedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealNeeds: [],
    };
    this.removeNeedClick = this.removeNeedClick.bind(this);
  }
  fetchNeeds() {
    //somehow need to get mealID from event click!!!
    axios.get(`./meal_needs/${XXXXX}`).then(resp => {
      this.setState({ mealNeeds: resp });
    });
  }
  removeNeedClick() {
    console.log(this, 'this is what clicked for meal need!!!');
  }
  render() {
    <div>
      {this.state.mealNeeds.map(need => <Need need={need} removeNeedClick={this.removeNeedClick} />)}
    </div>
  }
};

export default NeedList;
