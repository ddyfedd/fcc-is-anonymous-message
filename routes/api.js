'use strict';

const expect = require('chai').expect;
const mongodb = require('mongodb');
const mongoose = require('mongoose');



module.exports = function (app) {

  let uri = process.env.DB
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  
  app.route('/api/threads/:board');
    
  app.route('/api/replies/:board');

};
