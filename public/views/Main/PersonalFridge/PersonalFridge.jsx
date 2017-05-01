import React, { Component } from 'react';
import Ingredient from '../Ingredient/Ingredient';

export default class PersonalFridge extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      PersonalFridge
      <ul>
        {this.props.ingredients
          .map((item, key) => <Ingredient item={item} key={key} />)}
      </ul>
    </div>);
  }
}
