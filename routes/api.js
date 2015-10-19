var express = require('express');
var router = express.Router();
// var db = require('monk')(process.env.MONGOLAB_URI);
var db = require('monk')("localhost/guildaggro");
var users = db.get('users');
var guilds = db.get('guilds');
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
});

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
});

router.post('/guild-check', function (req, res) {
  var guildDomain = req.body.gDomain;
  var guildName = req.body.gName;
  var guildTempalte = req.body.gTemplate;
  var guildBackground = req.body.gBackground;
  var guildMaster = req.body.gMaster;
  guilds.insert({ domain: guildDomain, name: guildName, template: guildTempalte, backgroundIm: guildBackground, guildMaster: guildMaster, guildAdmin:[], guildMember:[], posts: []})
  .then(function (guild) {
    res.json(guild)
  })
});

router.post('/get-guild', function (req, res) {
  // console.log(req.body.gDomain);
  guilds.findOne({ domain: req.body.gDomain })
  .then(function (guild) {
    if (guild === undefined) {
      // console.log('didnt find');
      res.json(false)
    }
    else {
      // console.log('found it');
      res.json(guild)
    }
  })
});

router.post('/guild-post', function (req, res) {
  var title = req.body.postTitle;
  var body = req.body.postBody;
  var guildDomain = req.body.guild;
  var postedDate = new Date();
  guilds.update({ domain: guildDomain }, { $push: {posts: {$each: [{title: title, body: body, user: 'fill-with-user-info-object', date: postedDate}], $position: 0}}})
  .then(function (guild) {
    res.json(true)
  })
});

router.post('/user-check', function (req, res) {
  var userId = req.body.userIdent;
  users.findOne({ _id: userId })
  .then(function (user) {
    res.json({name: user.username});
  })
});

module.exports = router;
