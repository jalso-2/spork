import React, { Component } from 'react';

export default class Recipes extends Component {
  render() {
    return (<li ref={c => this.title = c} name="title">
      <div>{this.props.item.name}</div>
      <div><img alt={`${this.props.item.name}`} src={this.props.item.image} /></div>
      <div>{this.props.item.ingredients}</div>
      <div>{this.props.item.url}</div>
      <button
        type="button"
        onClick={this.props.likeRecipe.bind(this, this.props.item)}
      >Spork It!</button>
    </li>
    );
  }
}
