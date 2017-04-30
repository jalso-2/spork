/* global localStorage */
<<<<<<< HEAD
=======

>>>>>>> (prog) Add normal user signup
import React, { Component } from 'react';
import { ButtonToolbar, Button, Col } from 'react-bootstrap';
import {
  updateIngredients,
  saveRecipe,
  sendSMS,
  checkUser,
} from '../../../utils/utils';
import Ingredient from '../PersonalFridge/PersonalFridge';
import Recipes from '../MealMatcher/MealMatcher';
import AuthService from '../../../utils/AuthService';
import FriendList from '../FriendList/FriendList';
import Events from '../Events/Events';


const axios = require('axios');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      ingredients: [],
      recipies: [],
      profile: props.auth.getProfile(),
    };
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile });
      checkUser(JSON.parse(localStorage.profile), this.getMyIngredients.bind(this));
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.title.value;
    updateIngredients(value);
    this.resetInput();
    this.getMyIngredients();
  }
  getMyIngredients() {
    const params = JSON.parse(localStorage.profile).nickname;
    axios.get(`/my_ingredients/${params}`)
      .then((response) => {
        this.setState({ ingredients: response.data });
        this.render();
      });
  }
  getRecipe(e) {
    e.preventDefault();
    const value = this.title.value;
    this.findRecipe(value);
  }
  resetInput() {
    this.title.value = '';
  }
  findRecipe(ingredients) {
    const params = ingredients.replace(',', '/');
    axios.get(`/find_recipe/${params}`)
      .then((response) => {
        const recipies = response.data.hits.map(recipe => ({
          name: recipe.recipe.label,
          ingredients: recipe.recipe.ingredientLines,
          image: recipe.recipe.image,
          url: recipe.recipe.uri,
        }));
        this.setState({ recipies });
        this.render();
      });
  }
  likeRecipe(recipe) {
    saveRecipe(recipe);
  }

  render() {
    return (
      <div>
        <Col md={3}>
          <div>
            <FriendList friendLi={this.props} />
          </div>
        </Col>
        <Col md={6} lg={6}>
          <form>
            <input
              type="text"
              ref={c => this.title = c}
              name="title"
              placeholder="Enter Your Ingredients Here"
            />
            <button type="button" onClick={this.onSubmit.bind(this)} >Save</button>
          </form>

          <div>
            <ul>
              {this.state.ingredients
                .map((item, key) => <Ingredient item={item} key={key} />)}
            </ul>
          </div>
          <div>
            <form>
              <input
                type="text"
                ref={c => this.title = c}
                name="title"
                placeholder="Search For Recipies Here"
              />
              <button type="button" onClick={this.getRecipe.bind(this)}>Search Recipes</button>
            </form>
          </div>
          <div>
            <ul>
              {this.state.recipies
                .map((item, key) => <Recipes item={item} key={key} likeRecipe={this.likeRecipe} />)}
            </ul>
          </div>
          <div>
            <button type="button" onClick={sendSMS}>Let's Eat!</button>
          </div>
        </Col>
        <Col md={3} lg={3}>
          <div>
            <Events eventLi={this.props} />
          </div>
        </Col>
      </div>
    );
  }
}
