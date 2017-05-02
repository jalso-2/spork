import React, { Component } from 'react';
import { Well } from 'react-bootstrap';
export default class Recipes extends Component {
  render() {
    return (
      <Well>
        <li className="recipeItem" ref={c => this.title = c} name="title">
          <div className="recipeTitle">{this.props.item.name}</div>
          <div><img alt={`${this.props.item.name}`} src={this.props.item.image} /></div>
          <div className="recipeDescription">{this.props.item.ingredients}</div>
          <button
            type="button"
            onClick={this.props.likeRecipe.bind(this, this.props.item)}
          >Spork It!</button>
        </li>
      </Well>
    );
  }
}
// <div>{this.props.item.url}</div>