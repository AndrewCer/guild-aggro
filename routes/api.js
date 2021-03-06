var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
// var db = require('monk')("localhost/guildaggro");
var users = db.get('users');
var guilds = db.get('guilds');
var validateSignUp = require('../lib/validations.js');
var bcrypt = require('bcrypt');

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
          users.insert({ username: userName, email: email, password: hash, guild: [], avatar: 'http://vignette3.wikia.nocookie.net/wowwiki/images/6/68/WoW_Lich_King_Arthas.png/revision/latest?cb=20100221131133' })
          .then(function (user) {
            //return user id for later queries and cookies
            var userObj = {}
            userObj.ident = user._id;
            userObj.name = user.username;
            userObj.avatar = user.avatar
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
  var title = 'Welcome to Guild Aggro';
  var body = 'This is your first guild post! Head to "Posts" on the navbar to create more.';
  var postedBy = [{ident: "1234", name: 'Mr. T', avatar:'http://vignette3.wikia.nocookie.net/wowwiki/images/6/68/WoW_Lich_King_Arthas.png/revision/latest?cb=20100221131133'}];
  var postedDate = new Date();
  guilds.insert({ domain: guildDomain, name: guildName, template: guildTempalte, backgroundIm: guildBackground, guildMaster: guildMaster, guildAdmin:[], guildMember:[], posts: [{title: title, body: body, postedBy: postedBy, date: postedDate}], memberRequests: [], privacyStatus: 'public'})
  .then(function (guild) {
    users.update({ _id: guildMaster[0].ident }, {$push: {guild: guild._id}})
    .then(function () {
      res.json(guild)
    })
  })
});

router.post('/get-guild', function (req, res) {
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

router.post('/get-guildinfo', function (req, res) {
  guilds.findOne({ _id: req.body.gId})
  .then(function (guild) {
    if (guild === undefined) {
      res.json(false);
    }
    else {
      res.json(guild);
    }
  });
});

router.post('/domain-check', function (req, res) {
  var toCheck = req.body.domain;
  guilds.findOne({ domain: toCheck })
  .then(function (guild) {
    if (guild === null) {
      res.json(false);
    }
    else {
      res.json(true);
    }
  })
});

router.post('/guild-post', function (req, res) {
  var title = req.body.postTitle;
  var body = req.body.postBody;
  var guildDomain = req.body.guild;
  var postedBy = req.body.userInfo;
  var postedDate = new Date();
  guilds.update({ domain: guildDomain }, { $push: {posts: {$each: [{title: title, body: body, postedBy: postedBy, date: postedDate}], $position: 0}}})
  .then(function (guild) {
    res.json(true)
  })
});

router.post('/user-check', function (req, res) {
  var userId = req.body.userIdent;
  users.findOne({ _id: userId })
  .then(function (user) {
    var userObj = {};
    userObj.ident = user._id;
    userObj.name = user.username;
    userObj.guild = user.guild[0];
    userObj.avatar = user.avatar
    res.json(userObj);
  })
});

router.post('/user-login', function (req, res) {
  var userName = req.body.userN.toLowerCase();
  var userPassword = req.body.userP;
  users.findOne({ username: userName })
  .then(function (user) {
    if (user === undefined) {
      //user not found
      res.json({ error: true });
    }
    else {
      if(bcrypt.compareSync(userPassword, user.password)) {
        var userObj = {};
        userObj.ident = user._id;
        userObj.name = user.username;
        userObj.avatar = user.avatar
        res.json(userObj);
      }
      else {
        res.json({ error: true })
      }
    }
  });
});

router.post('/change-avatar', function (req, res) {
  var newUrl = req.body.newUrl;
  var userId = req.body.userId;
  users.update({ _id: userId }, { $set: {avatar: newUrl}})
  .then(function (response) {
    res.json(true);
  });
});

router.post('/change-guild-name', function (req, res) {
  var newName = req.body.newName;
  var guildId = req.body.guildId;
  guilds.update({ _id: guildId }, { $set: {name: newName}})
  .then(function (response) {
    res.json(true);
  });
});

router.post('/change-guild-banner', function (req, res) {
  var newBanner = req.body.newBanner;
  var guildId = req.body.guildId;
  console.log(newBanner, guildId);
  guilds.update({ _id: guildId }, { $set: {backgroundIm: newBanner}})
  .then(function (response) {
    res.json(true);
  });
});

router.get('/all-guilds', function (req, res) {
  guilds.find({})
  .then(function (guilds) {
    res.json(guilds)
  });
});

router.post('/guild-apply', function (req, res) {
  var guildId = req.body.guildId;
  var userId = req.body.userId;
  var userName = req.body.userName;
  guilds.update({ _id: guildId }, { $push: {memberRequests: {$each:[{userName: userName, userId: userId}]}}})
  .then(function (response) {
    res.json(true);
  });
});

router.post('/guild-add-member', function (req, res) {
  var guildId = req.body.guildId;
  var userId = req.body.userId;
  var userName = req.body.userName;
  console.log(guildId, userId, userName);
  guilds.update({ _id: guildId }, { $push: {guildMember: {$each:[{ident: userId, name: userName}], $position: 0}}})
  .then(function () {
    guilds.update({ _id: guildId }, { $pull: { memberRequests: {userId: userId}}})
      .then(function () {
        users.update({ _id: userId }, { $push: {guild: guildId}})
        .then(function () {
          res.json(true)
        });
      });
    });
});

module.exports = router;
