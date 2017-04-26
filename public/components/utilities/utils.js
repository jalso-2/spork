import React, { Component } from 'react';

const axios = require('axios');

class Ingredient extends React.Component {
  render() {
    return (<li>{this.props.item}</li>);
  }
}

class Recipes extends React.Component {
  render() {
    return (<li ref={c => this.title = c} name="title">
      <div>{this.props.item.name}</div>
      <div><img alt={`${this.props.item.name}`} src={this.props.item.image} /></div>
      <div>{this.props.item.ingredients}</div>
      <div>{this.props.item.url}</div>
      <button
        type="button"
        onClick={this.props.likeRecipe.bind(this, this.props.item)}
      >Like</button>
    </li>
    );
  }
}

const updateIngredients = (ingredient) => {
  axios.post('/my_ingredients', { ingredient })
    .then(response => response);
};

const saveRecipe = (recipe) => {
  axios.post('/save_recipe', { recipe })
    .then(response => response);
};

module.exports.updateIngredients = updateIngredients;
module.exports.saveRecipe = saveRecipe;
module.exports.Ingredient = Ingredient;
module.exports.Recipes = Recipes;

