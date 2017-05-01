import React, { Component } from 'react';
import Ingredient from '../Ingredient/Ingredient';
import { Button } from 'react-bootstrap';

const axios = require('axios');

export default class PersonalFridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
    };
  }
  render() {
    return (<div>
      Personal Fridge
      <ul>
        {this.props.ingredients
          .map((item, key) => <span > <Ingredient item={item} key={key} />  <Button name={item} bsStyle="danger" onClick={this.props.onClick.bind(item)} /> </span>)}
      </ul>
    </div>);
  }
}
