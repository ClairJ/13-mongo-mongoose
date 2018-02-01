'use strict'

const mongoose = require('mongoose')

const Toy = mongoose.Schema({
  'material': {type: String},
  'name': {type: String},
  'origin': {type: String},
}, {timestamps: true})

module.exports = mongoose.model('toys', Toy)
