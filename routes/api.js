var express = require('express');
var router = express.Router();
// var unirest = require('unirest');
// var db = require('monk')(process.env.MONGOLAB_URI);
// var users = db.get('users');
var validateSignUp = require('../lib/validations.js').authentication;
// var bcrypt = require('bcrypt');

router.post('/authenticate', function(req, res, next) {
  var userName = req.body.username;
  var email = req.body.email;
  var emailConfirm = req.body.emailConfirm;
  var password = req.body.password;
  var passConfirm = req.body.passwordConfirm;
  
});


module.exports = router;
