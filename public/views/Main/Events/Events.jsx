import React, { Component } from 'react';
import Event from '../Event/Event';


class Events extends Component {
  constructor(props) {
    super(props);
    this.clickAccept = this.clickAccept.bind(this);
    this.clickDecline = this.clickDecline.bind(this);
  }
  clickAccept(time) {
    console.log("ACCEPT", this, time);
    console.log('YES THANKS');
  }
  clickDecline() {
    console.log("DECLINE", this);
    console.log('NO THANKS');
  }

  render() {
    const eventTest = [{time:'1:00', location:'myhouse'},{time:'4:00', location:'hishouse'},{time:'2:00', location:'herhouse'}]
    return (
      <div>
        {eventTest.map(meal =>
          <Event
            clickAccept={this.clickAccept}
            clickDecline={this.clickDecline}
            meal={meal}
            key={`${meal.time}${meal.location}`}
          />)}
      </div>
    );
  }
}
//  {this.props.user.meals.map(meal =>
export default Events;



