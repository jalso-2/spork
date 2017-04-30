import React from 'react';
// import { ButtonToolbar, Button } from 'react-bootstrap';
// need to link to db.......
const MyFavRecipes = props => (
  <div>
    <h2>My Most Recent</h2>
    <div>
      <ol>
        {props.recipes.slice(-5).map(recipe =>
          <li>{recipe.recipeName}</li>,
        )}
      </ol>
    </div>
  </div>
);



export default MyFavRecipes;

