'use strict';

const Toy = require('../model/toy');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  //router.get()
  //router.post()

  //Below is another example of mounting route methods to the Router
  router.route('/toy/:_id?')
    .get((req, res) => {
    //debug(`${req.method}: ${req.url}`)

      if(req.params._id) {
        return Toy.findById(req.params._id)
          .then(toy => res.status(200).json(toy))
          .catch(err => errorHandler(err, res));
      }
      return Toy.find()
        .then(toy => toy.map(toy => toy._id))
        .then(toy => res.status(200).json(toy))
        .catch(err => errorHandler(err, res));

      //otherwise handle the case of no ID
    })
    .post(bodyParser, (req, res) => {
      new Toy(req.body).save()
        .then(toy => res.status(201).json(toy))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      return Toy.findByIdAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
        .then(toy => res.status(200).json(toy))
        .catch(err => errorHandler(err, res));
    })
    .delete((req, res) => {
      Toy.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};
