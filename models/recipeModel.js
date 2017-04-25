const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    unique: true,
  },

  image: String,

  ingredients: Array,

  url: String,

  likedBy: Array,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
