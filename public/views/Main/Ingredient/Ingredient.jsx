import React, { Component } from 'react';

export default class Ingredient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<li>{this.props.item} </li>);
  }
}
