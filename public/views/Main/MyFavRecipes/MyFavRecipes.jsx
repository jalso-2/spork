/* global localStorage */
import React, { Component } from 'react';

const axios = require('axios');

// import myFavorites from '../../../utils/utils';
// import { ButtonToolbar, Button } from 'react-bootstrap';
// need to link to db.......

export default class MyFavRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favRecipes: [],
    };
    this.myFavorites();
  }
  myFavorites() {
    const params = JSON.parse(localStorage.profile).email;
    axios.get(`/fav_recipes/${params}`).then((response) => {
      console.log(response.data, 'fsdfcjkdsfcbs')
      if (response.data.likedRecipes) {
        this.setState({ favRecipes: response.data.likedRecipes });
      }
    });
  }
  render() {
    return (
      // <div>{console.log("FAV", JSON.parse(localStorage.profile).email)}</div>
      <div>
        <h2>Recently Sporked!</h2>
        <div>
          <ol>
            {this.state.favRecipes.slice(-5).map(recipe =>
              <li>{ recipe }</li>,
            )}
          </ol>
        </div>
      </div>
    );
  }

}

