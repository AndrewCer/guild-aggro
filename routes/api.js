var express = require('express');
var router = express.Router();
// var db = require('monk')(process.env.MONGOLAB_URI);
// var users = db.get('users');
var validateSignUp = require('../lib/validations.js');
// var bcrypt = require('bcrypt');

router.post('/check-db', function (req, res) {
  // TODO: check db for the incoming field to see if its taken (username, email, or guild name)
  //static username to simulate db
  var toCheck = req.body.toCheck
  var username = 'andrew';
  var email = 'cer.andrew@gmail.com';
  if (username === toCheck || email === toCheck) {
    res.json(true);
  }
  else {
    res.json(false);
  }
})

router.post('/auth', function (req, res) {
  var userName = req.body.userName;
  var email = req.body.email;
  var emailConfirm = req.body.emailConfirm;
  var password = req.body.password;
  var passConfirm = req.body.passwordConfirm;
  //to simulate hack from client side
  // var passConfirm = 'testy';
  var handleArray = validateSignUp.checkHandle(userName);
  var passwordArray = validateSignUp.checkPassword(password, passConfirm);
  var emailArray = validateSignUp.checkEmail(email, emailConfirm);
  if (handleArray.length != 0 || passwordArray.length != 0 || emailArray != 0) {
    var returnObj = {}
    returnObj.handleErrors = handleArray;
    returnObj.passwordErrors = passwordArray;
    returnObj.emailArray = emailArray;
    res.json(returnObj);
  }
  else {
    //nothing went wrong
    res.json(false);
    //check db for already occuring names and if none exists insert and redirect otherwise tell user
  }
})


module.exports = router;
