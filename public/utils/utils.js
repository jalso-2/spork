const axios = require('axios');

const updateIngredients = (ingredient) => {
  axios.post('/my_ingredients', { ingredient })
    .then(response => response);
};

const saveRecipe = (recipe) => {
  axios.post('/save_recipe', { recipe })
    .then(response => response);
};

const sendSMS = (location, time) => {
  axios.get(`/lets_eat/${location}/${time}`)
    .then(response => response);
};

const checkUser = (profile, cb) => {
  axios.post('/check_user', { profile })
    .then(() => cb());
};

const myFavorites = (person) => {
  console.log("MYFAVORITES");
};

module.exports.updateIngredients = updateIngredients;
module.exports.saveRecipe = saveRecipe;
module.exports.sendSMS = sendSMS;
module.exports.checkUser = checkUser;
module.exports.myFavorites = myFavorites;
