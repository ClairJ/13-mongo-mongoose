'use strict';

const Production = require('../model/production.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');

module.exports = function(router) {
  router.route('/production/:_id?')
    .get((req, res) => {

      if(req.params._id) {
        return Production.findById(req.params._id)
          .populate('toy')
          .then(production => res.status(200).json(production))
          .catch(err => errorHandler(err, res));
      }
      Production.find()
        .then(production => production.map(production => production._id))
        .then(production => res.status(200).json(production))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      new Production(req.body).save()
        .then(production => res.status(201).json(production))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      Production.findOneAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));

    })
    .delete((req, res) => {
      Production.findById(req.params._id)
        .then(production => production.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));

    });
};
