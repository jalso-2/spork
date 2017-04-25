const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  recipe: {
    type: String,
    required: true,
    unique: true,
  },

  likedBy: Array,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
