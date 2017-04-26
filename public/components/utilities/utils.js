const axios = require('axios');

const updateIngredients = (ingredient) => {
  axios.post('/my_ingredients', { ingredient })
    .then(response => response);
};

const saveRecipe = () => {
  console.log('save recipe');
};

module.exports.updateIngredients = updateIngredients;
module.exports.saveRecipe = saveRecipe;
