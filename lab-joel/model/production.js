'use strict';

const mongoose = require('mongoose');
const Toy = require('./toy.js');

const Production = mongoose.Schema({
  'year': {type: Number},
  'color': {type: String},
  'make': {type: String, required: true},
  'category': {type: String, required: true},
  'toy': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'toys'},
}, {timestamps: true});

Production.pre('save', function(next) {
  Toy.findById(this.toy)
    .then(toy => {
      let productionIds = new Set(toy.productions);
      productionIds.add(this._id);
      toy.productions = [...productionIds];
      Toy.findByIdAndUpdate(this.toy, {toy: toy.productions});
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Bike.')));
});

Production.post('remove', function(doc, next) {
  Toy.findById(doc.toy)
    .then(toy => {
      toy.productions = toy.productions.filter(a => a.toString() !== doc._id.toString());
      Toy.findByIdAndUpdate(this.toy, {toy: toy.productions});
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('productions', Production);
