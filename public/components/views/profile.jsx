import React, { Component } from 'react';
import { updateIngredients } from '../utilities/utils';
const axios = require('axios');


class Ingredient extends React.Component {
  render() {
    return (<li>{this.props.item}</li>);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      ingredients: [],
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
  render() {
    return (
      <div id="home">
        This is the profile page.
         <form className="form-horizontal">
           <input type="text" ref={c => this.title = c} name="title" />
         </form>
        <button type="button" onClick={this.onSubmit.bind(this)} >Save</button>
        <div>
          <ul>
            {this.state.ingredients.map((item, key) => <Ingredient item={item} key={key} />)}
          </ul>
        </div>
      </div>
    );
  }
}
