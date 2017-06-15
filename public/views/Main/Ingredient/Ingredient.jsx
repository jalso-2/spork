import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

export default class Ingredient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Well>
        <li className="ingredient">{this.props.item} </li>
      </Well>);
  }
}
