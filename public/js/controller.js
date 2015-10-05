String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

app.controller('MasterController', ['$scope', '$location', '$anchorScroll', '$window', function ($scope, $location, $anchorScroll, $window) {
  $scope.closeModal = function () {
    $location.path('/');
    $location.hash('portfolio');
    $anchorScroll();
  }
  $scope.goHome = function () {
    $window.location = '/'
  }
}])

app.controller('SplashController', ['$scope', '$timeout', function ($scope, $timeout) {
  // NOTE: testing here
    // $scope.startFade = true;
    // $timeout(function(){
    //     $scope.hidden = true;
    // }, 3000);
  // NOTE: testing here
}])

app.controller('InitSignUpController', ['$scope', '$window', '$location', '$http', 'UserStore', 'dbCheck', function ($scope, $window, $location, $http, UserStore, dbCheck) {
  // NOTE: refactored and moved into factory
  // var checkAvailability = function (type) {
  //   return $http.post('api/check-db', {toCheck: type})
  //   .then(function (response) {
  //     return response
  //   })
  // }
  $scope.instaValidation = function (input, spot) {
    // $scope.nameUnAvailable = false;
    // $scope.nameAvailable = false;
    // $scope.emailUnAvailable = false;
    // $scope.emailAvailable = false;
    if (authentication(input, spot).length != 0) {
      if (spot === 'User name') {
        $scope.allPass = false;
        $scope.handleError = authentication(input, spot);
      }
      if (spot === 'Password') {
        $scope.allPass = false;
        $scope.passwordPassed = false;
        $scope.passwordFillError = true;
        $scope.passLength = false;
        $scope.passConfirmError = true;
        $scope.passConfirmPassed = null;
        $scope.passwordError = authentication(input, spot);
      }
      if (spot === 'Email') {
        $scope.allPass = false;
        $scope.emailError = authentication(input, spot);
      }
    }
    else {
      if (spot === 'User name') {
        $scope.handleError = null;
      }
      if (spot === 'Password') {
        $scope.passLength = true;
        $scope.passwordPassed = true;
        $scope.passwordError = null;
      }
      if (spot === 'Email') {
        $scope.emailError = null;
      }
    }
    if ($scope.handleError === null && $scope.passwordError === null && $scope.emailError === null && $scope.emailConfirmError === null && $scope.passwordConfirmError === null) {
      if ($scope.nameUnAvailable === true || $scope.emailUnAvailable === true) {
        $scope.allPass = false;
      }
      else {
        $scope.allPass = true;
      }
    }
  }
  $scope.samenessCheck = function (original, newInput, type) {
    if (original != newInput) {
      if (type === "email") {
        $scope.emailConfirmError = 'Email address does not match';
        $scope.allPass = false;
        $scope.emailNonMatch = true;
      }
      if (type === 'password') {
        $scope.passConfirmError = true;
        $scope.passConfirmPassed = false;
        $scope.allPass = false;
        $scope.passwordConfirmError = 'Password does not match';
      }
    }
    else {
      if (type === 'email') {
        $scope.emailConfirmError = null;
        if ($scope.emailAvailable == true) {
          $scope.allPass = true;
          $scope.emailPass = true;
          $scope.emailConfirmError = null;
        }
      }
      if (type === 'password') {
        if ($scope.passwordError === null ) {
          $scope.allPass = true;
          $scope.passConfirmError = false;
          $scope.passConfirmPassed = true;
          $scope.passwordConfirmError = null;
        }
        // $scope.passwordConfirmError = null;
      }
    }
    if ($scope.handleError === null && $scope.passwordError === null && $scope.emailError === null && $scope.emailConfirmError === null && $scope.passwordConfirmError === null) {
      // TODO: set ng animate to brightly color the button when this all passes
      if ($scope.nameUnAvailable === true || $scope.emailUnAvailable === true) {
        $scope.allPass = false;
      }
      else {
        $scope.allPass = true;
      }
    }
  }
  $scope.checkDb = function (input) {
    // NOTE: dbCheck calles a factor from a function to do an http.post to db
    // dbCheck.getCheck(type).then(function (response) {
    // })
    if (input === 'name') {
      if ($scope.handleError === null) {
        var toCheckObj = {};
        toCheckObj.input = $scope.userHandle;
        toCheckObj.spot = input;
        dbCheck.getCheck(toCheckObj)
        .then(function (value) {
          if (value.data === true) {
          $scope.allPass = false;
          $scope.nameUnAvailable = true;
          $scope.nameAvailable = false;
          }
          else {
            $scope.allPass = false;
            $scope.nameUnAvailable = false;
            $scope.nameAvailable = true;
          }
        });
      }
    }
    if (input === 'email') {
      if ($scope.emailError === null) {
        var toCheckObj = {};
        toCheckObj.input = $scope.email;
        toCheckObj.spot = input;
        dbCheck.getCheck(toCheckObj)
        .then(function (value) {
          if (value.data === true) {
            $scope.allPass = false;
            $scope.emailUnAvailable = true;
            $scope.emailAvailable = false;
            $scope.emailPass = false;
          }
          else {
            $scope.allPass = false;
            $scope.emailUnAvailable = false;
            $scope.emailAvailable = true;
          }
        })
      }
    }
  }
  $scope.accountCreation = function () {
    var userName = $scope.userHandle;
    var email = $scope.email;
    var emailConfirm = $scope.emailConfirm;
    var password = $scope.password;
    var passwordConfirm = $scope.passwordConfirm;
    //make call to server, do same checks as above. If pass, load new partial, else display errors
    if ($scope.allPass) {
      $http.post('api/auth', {userName: userName, email: email, emailConfirm: emailConfirm, password: password, passwordConfirm: passwordConfirm})
      .then(function (response) {
        if (response.data.handleErrors || response.data.passwordErrors || response.data.emailArray) {
          //something went wrong or already exists in db
          $scope.allPass = false;
          $scope.handleError = response.data.handleErrors
          $scope.passwordError = response.data.passwordErrors
          $scope.emailError = response.data.emailArray
          console.log(response.data);
        }
        else {
          //passed and inserted user into db
          //pass data from db to a factory
          UserStore.userInfo(response.data);
          // TODO: figure out how to access this factory
          //redirect and access user info from another controller/partial
          $location.path('/guild-creation')
        }
      })
    }
  }
  //use to clear form info (or anything else for that matter)
  $scope.clearForm = function () {
  }
}])

app.controller('GuildCreationController', ['$scope', '$window', '$location', '$http', '$timeout', 'UserStore', function ($scope, $window, $location, $http, $timeout, UserStore) {
  // NOTE: get user id
  // console.log(UserStore.user[0].ident);
  // NOTE: get user name
  // console.log(UserStore.user[0].name);
  // $scope.userName = UserStore.user[0].name.capitalize();
  /// NOTE: used for building page template
  $scope.userName = 'andrew'.capitalize();
  // TODO: get this to fire off when view loads, rather than when the initial app loads
  // $scope.startFade = true;
  // $timeout(function(){
  //     $scope.hidden = true;
  // }, 9000);
  // NOTE: temp fix until above is solved
  $scope.tempSeedGameData = ['World of Warcraft', 'Aion', 'Final Fantasy', 'Age of Conan', 'Eve']
  // $scope.selectedGame = null;
  $scope.chooseGame = function (game) {
    $scope.selectedGame = game
  }
  $scope.hideBox = function () {
      $scope.startFade = true;
      $timeout(function(){
          $scope.hidden = true;
      }, 1000);
  };

}])

app.controller('BlueController', ['$scope', function ($scope) {
  $scope.homeShow = true;
  $scope.postContent = function () {
    $scope.homeShow = false;
  }
  $scope.showHome = function () {
    $scope.homeShow = true;
  }
}])
