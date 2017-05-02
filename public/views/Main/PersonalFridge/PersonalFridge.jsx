import React, { Component } from 'react';
import Ingredient from '../Ingredient/Ingredient';
import { Button, Well } from 'react-bootstrap';

const axios = require('axios');

export default class PersonalFridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
    };
  }
  render() {
    return (<div className="row">
      <ul className="col-md-12">
        {this.props.ingredients
          .map((item, key) => <Well> <Ingredient item={item} key={key} />  <Button name={item} bsStyle="danger btn-xs" onClick={this.props.onClick.bind(item)}>Delete</Button> </Well>)}
      </ul>
    </div>);
  }
}
