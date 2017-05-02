import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {
  sendSMS,
} from '../../../utils/utils';

export default class TwilioText extends Component {
  constructor() {
    super();
    this.state = {
      locationTime: '',
    };
    this.onChange = this.onChange.bind(this);
    this.sendMyMsg = this.sendMyMsg.bind(this);
  }
  onChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }
  sendMyMsg() {
    console.log('fcdsajcdskvdkjabvdjvdchdkmvnfjvufdjcn')
    const location = this.state.locationTime.split(',')[0];
    const time = this.state.locationTime.split(',')[1];
    console.log(location, 'location')
    console.log(time, 'time')
    sendSMS(location, time);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onChange}
          name="locationTime"
          value={this.state.locationTime}
          placeholder="Location,Time"
        />
        <Button bsStyle="info" type="button" onClick={this.sendMyMsg}>Let's Eat!</Button>
      </div>
    );
  }
}
