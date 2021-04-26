'use strict';

const expect = require('chai').expect;
const mongodb = require('mongodb');
const mongoose = require('mongoose');



module.exports = function (app) {

  let uri = process.env.DB
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

  let replySchema = new mongoose.Schema({
    text: {type: String, required: true},
    delete_password: {type: String, required: true},
    created_on: {type: Date, required: true},
    reported: {type: Boolean, required: true}
  });

  let threadSchema = new mongoose.Schema({
    text: {type: String, required: true},
    delete_password: {type: String, required: true},
    board: {type: String, required: true},
    created_on: {type: Date, required: true},
    bumped_on: {type: Date, required: true},
    reported: {type: Boolean, required: true},
    replies: [replySchema]
  });

  let Reply = mongoose.model('Reply', replySchema);
  let Thread = mongoose.model('Thread', threadSchema);
  
  app.post('/api/threads/:board', (req, res) => {
    let newThread = new Thread(req.body);
    
    if(!newThread.board || newThread.board === '') {
      newThread.board = req.params.board;
    }

    newThread.created_on = new Date().toUTCString();
    newThread.bumped_on = new Date().toUTCString();
    newThread.reported = false;
    newThread.replies = [];

    newThread.save((err, savedThread) => {
      if(!err && savedThread) {
        return res.redirect('/b/' + savedThread.board + '/' + savedThread.id);
      }
    });
  });
  
  //app.route('/api/threads/:board');
    
  //app.route('/api/replies/:board');

};
