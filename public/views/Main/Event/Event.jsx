import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

const Event = props => (
  <div>
    <h4>{props.meal.time} {props.meal.location}</h4>
    <ButtonToolbar >
      <Button bsStyle="success" data-id={props.meal.time} onClick={props.clickAccept.bind(event, props.meal.time)}>Yes Please!</Button>
      <Button bsStyle="danger" data-id={props.meal.time} onClick={props.clickDecline}>No Thanks</Button>
    </ButtonToolbar>
  </div>
);


export default Event;
