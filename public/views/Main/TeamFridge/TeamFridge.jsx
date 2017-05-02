import React, { Component } from 'react';
import IngredientTeam from '../IngredientTeam/IngredientTeam';

const axios = require('axios');

export default class TeamFridge extends Component {
  constructor() {
    super();
    this.state = {
      nickname: JSON.parse(localStorage.profile).nickname,
      ingreds: [],
    };
    this.getIngreds = this.getIngreds.bind(this);
    this.getIngreds();
  }
  getIngreds() {
    axios.get(`/get_user/${this.state.nickname}`).then(resp => this.setState({ ingreds: resp.data }));
  }
  render() {
    return (<div>
      <ul>
        {this.state.ingreds
          .map(ingred => <IngredientTeam ingred={ingred} key={ingred} />)}
      </ul>
    </div>);
  }
}