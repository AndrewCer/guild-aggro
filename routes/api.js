var express = require('express');
var router = express.Router();
// var db = require('monk')(process.env.MONGOLAB_URI);
var db = require('monk')("localhost/guildaggro");
var users = db.get('users');
var validateSignUp = require('../lib/validations.js');
var bcrypt = require('bcrypt');

// NOTE: rough guilds collection schema
// guilds {
//   this.domain:
//   this.gName:
//   this.
// }

router.post('/check-db', function (req, res) {
  // TODO: can also use this to check if guilds are available!
  var toCheck = req.body.toCheck.input.toLowerCase();
  var spot = req.body.toCheck.spot;
  if (spot === 'name') {
    users.findOne({username: toCheck})
    .then(function (user) {
      if (user === null) {
        res.json(false);
      }
      else {
        res.json(true);
      }
    })
  }
  if (spot === 'email') {
    users.findOne({email: toCheck})
    .then(function (user) {
      if (user === null) {
        res.json(false);
      }
      else {
        res.json(true);
      }
    })
  }
})

router.post('/auth', function (req, res) {
  var userName = req.body.userName.toLowerCase();
  var email = req.body.email.toLowerCase();
  var emailConfirm = req.body.emailConfirm.toLowerCase();
  var password = req.body.password;
  var passConfirm = req.body.passwordConfirm;
  //to simulate hack from client side
  // var passConfirm = 'testy';
  var handleArray = validateSignUp.checkHandle(userName);
  var passwordArray = validateSignUp.checkPassword(password, passConfirm);
  var emailArray = validateSignUp.checkEmail(email, emailConfirm);
  var returnObj = {}
  if (handleArray.length != 0 || passwordArray.length != 0 || emailArray != 0) {
    returnObj.handleErrors = handleArray;
    returnObj.passwordErrors = passwordArray;
    returnObj.emailArray = emailArray;
    res.json(returnObj);
  }
  else {
    //check db for already occuring names and if none exists insert and redirect otherwise tell user
    users.findOne({username: userName})
    .then(function (user) {
      if (user) {
        returnObj.handleErrors = ['Name Unavailable'];
        res.json(returnObj);
      }
      users.findOne({email: email})
      .then(function (user) {
        if (user) {
          returnObj.emailArray = ['Email Unavailable'];
          res.json(returnObj);
        }
        else {
        //nothing went wrong insert away
        bcrypt.hash(password, 8, function(err, hash) {
          users.insert({ username: userName, email: email, password: hash })
          .then(function (user) {
            //return user id for later queries and cookies
            var userObj = {}
            userObj.ident = user._id;
            userObj.name = user.username;
            res.json(userObj);
          })
        });
        }
      })
    })
  }
})


module.exports = router;
