/* global localStorage */
import React, { Component } from 'react';
import { ButtonToolbar, Button, Col } from 'react-bootstrap';
import {
  updateIngredients,
  saveRecipe,
  sendSMS,
  checkUser,
} from '../../../utils/utils';
import Ingredient from '../Ingredient/Ingredient';
import Recipes from '../MealMatcher/MealMatcher';
import PersonalFridge from '../PersonalFridge/PersonalFridge';
import AuthService from '../../../utils/AuthService';
import FriendList from '../FriendList/FriendList';
import Events from '../Events/Events';
import Nav from '../Nav/Nav';
import MyFavRecipes from '../MyFavRecipes/MyFavRecipes';

const axios = require('axios');

export default class MainMeal extends Component {
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
      checkUser(JSON.parse(localStorage.profile), this.getMyIngredients);
    });
    this.onClick = this.onClick.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.title.value;
    updateIngredients(value);
    this.title.value = '';
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

  findRecipe(ingredients) {
    const params = ingredients.replace(',', '/');
    console.log("FINDRECIPE", params);
    axios.get(`/find_recipe/${params}`)
      .then((response) => {
        console.log("RESPHITS", response.data.hits)
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
  onClick(e) {
    const params = e.target.name;
    axios.delete(`/delete_ingredient/${params}`)
      .then((response) => {
        this.setState({ ingredients: response.data });
        this.render();
      });
  }
  render() {
    return (
      <div>
        <Nav navBar={this.props} />
        <Col md={3}>
          <div>
            <form>
             <h2>Personal Fridge</h2>
              <Button bsStyle="info" type="button" onClick={this.onSubmit.bind(this)} >Show Ingredients</Button>
            </form>
            <div>
              <PersonalFridge ingredients={this.state.ingredients} onClick={this.onClick} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={6}>
          <div>
            <ul>
              <form>
              <h2>Hey Chef!</h2>
                <input
                  type="text"
                  ref={c => this.title = c}
                  name="title"
                  placeholder="Search For Recipies Here"
                />
                <Button bsStyle="info" type="button" onClick={this.getRecipe.bind(this)}>Search Recipes</Button>
              </form>
              {this.state.recipies
                .map((item, key) => <Recipes item={item} key={key} likeRecipe={this.likeRecipe} />)}
            </ul>
          </div>
        </Col>
        <Col md={3} lg={3}>
          <div>
            <MyFavRecipes myRecipes={this.props} />
            <Events eventLi={this.props} />
          </div>
        </Col>
        <div>
          <Button bsStyle="info" type="button" onClick={sendSMS}>Let's Eat!</Button>
        </div>
      </div>
    );
  }
}
            // <FriendList friendLi={this.props} />
