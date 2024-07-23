const foodData = require('../data/data.json')
const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  serving_size: {
    type: String,
    required: true,
    },
    type: {
        type: String,
        required: true
  }
});


module.exports = mongoose.model('Food', foodSchema)