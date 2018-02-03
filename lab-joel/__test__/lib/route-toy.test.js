'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/track', function() {
  beforeAll(() => this.mockToy = {material: 'wood', name: 'yo-yo'});
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  describe('valid requests', () => {
    test('Should return a 201 status', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/toy`)
        .send(this.mockToy)
        .then(res => expect(res.status).toEqual(201));
    });
  });
  describe('invalid request', () => {
    test('Should return a 400 status', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/to`)
        .then(res => expect(res.status).toEqual(404));
    });
  });
});
