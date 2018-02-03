'use strict';

const mongoose = require('mongoose');

const Toy = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  productions: [{type: mongoose.Schema.Types.ObjectId, ref: 'productions'}],
});

Toy.pre('save', function(next) {
  this.validate((err) => {
    if(err) next(() => console.error(err));
    next();
  });
});

module.exports = mongoose.model('toys', Toy);
