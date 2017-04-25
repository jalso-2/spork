const axios = require('axios');

const updateIngredients = (ingredient) => {
  axios.post('/my_ingredients', { ingredient })
    .then(response => console.log(response));
};

const getMyIngredients = () => {
  console.log('feuwhafcjafilkdsla');
  axios.get('/my_ingredients')
    .then(response => response.data);
};

module.exports.updateIngredients = updateIngredients;
module.exports.getMyIngredients = getMyIngredients;
