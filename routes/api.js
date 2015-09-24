var express = require('express');
var router = express.Router();
// var unirest = require('unirest');
// var db = require('monk')(process.env.MONGOLAB_URI);
// var users = db.get('users');
var validateSignUp = require('../lib/validations.js');
// var bcrypt = require('bcrypt');

router.post('/authenticate', function(req, res, next) {
  var userName = req.body.username;
  var email = req.body.email;
  var emailConfirm = req.body.emailConfirm;
  var password = req.body.password;
  var passConfirm = req.body.passwordConfirm;
  var errorArray = [];
  if (email != emailConfirm) {
    errorArray.push('Email does not match')
  }
  if (password != passConfirm) {
    errorArray.push('Password does not match')
  }
  if (errorArray.length != 0) {
    res.json(errorArray)
  }
  else {
    //check db for already occuring names and if none exists insert and redirect otherwise tell user
  }
});


module.exports = router;
