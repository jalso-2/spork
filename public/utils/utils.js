const axios = require('axios');

const updateIngredients = (ingredient) => {
      axios.post('/my_ingredients', { ingredient })
        .then(response => response);
};

const saveRecipe = (recipe) => {
  axios.post('/save_recipe', { recipe })
    .then(response => response);
};

const sendSMS = () => {
  axios.get('/lets_eat')
    .then(response => response);
};

const checkUser = (profile) => {
  axios.post('/check_user', { profile })
    .then(response => response);
};

module.exports.updateIngredients = updateIngredients;
module.exports.saveRecipe = saveRecipe;
module.exports.sendSMS = sendSMS;
module.exports.checkUser = checkUser;
