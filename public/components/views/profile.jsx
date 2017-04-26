import React, { Component } from 'react';
import { updateIngredients, saveRecipe } from '../utilities/utils';
const axios = require('axios');


class Ingredient extends React.Component {
  render() {
    return (<li>{this.props.item}</li>);
  }
}

class Recipies extends React.Component {
  render() {
    return (<li >
      <div>{this.props.item.name}</div>
      <div><img src={this.props.item.image} /></div>
      <div>{this.props.item.ingredients}</div>
      <div>{this.props.item.url}</div>
      </li>
    );
  }
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      ingredients: [],
      recipies: [],
    };
    this.getMyIngredients();
  }
  onSubmit(e) {
    e.preventDefault();
    const value = this.title.value;
    updateIngredients(value);
  }
  getMyIngredients() {
    axios.get('/my_ingredients')
      .then(response => this.setState({ ingredients: response.data }));
  }
  getRecipe(e) {
    e.preventDefault();
    const value = this.title.value;
    this.findRecipe(value);
  }
  findRecipe(ingredients) {
    const params = ingredients.replace(',', '/');
    axios.get(`/find_recipe/${params}`)
      .then((response) => {
        const recipies = response.data.hits.map((recipe) => {
          return { name: recipe.recipe.label,
            ingredients: recipe.recipe.ingredientLines,
            image: recipe.recipe.image,
            url: recipe.recipe.uri };
        });
        this.setState({ recipies });
        this.render();
      });
  }
  render() {
    return (
      <div id="home">
        This is the profile page.
         <form className="form-horizontal">
           <input type="text" ref={c => this.title = c} name="title" placeholder="Enter Your Ingredients Here" />
         </form>
        <button type="button" onClick={this.onSubmit.bind(this)} >Save</button>
        <div>
          <ul>
            {this.state.ingredients.map((item, key) => <Ingredient item={item} key={key} />)}
          </ul>
        </div>
        <div>
          <form className="form-horizontal">
           <input type="text" ref={c => this.title = c} name="title" placeholder="Search For Recipies Here" />
         </form>
        <button type="button" onClick={this.getRecipe.bind(this)} >Save</button>
        </div>
         <ul>
            {this.state.recipies.map((item, key) => <Recipies item={item} key={key} />)}
        </ul>
      </div>
    );
  }
}
