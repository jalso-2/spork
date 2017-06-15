const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({

  host: String,

  people: Array,

  teamFridge: Array,

  ingredients: Array,

  missingIngredients: Array,

  tenMatches: Array,

  topThree: Array,

  location: String,

  time: String,
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
