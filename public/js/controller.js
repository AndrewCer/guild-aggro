app.controller('MasterController', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
  $scope.closeModal = function () {
    $location.path('/');
    $location.hash('portfolio');
    $anchorScroll();
  }
}])

app.controller('SplashController', ['$scope', function ($scope) {

}])

app.controller('InitSignUpController', ['$scope', '$window', '$location', '$http', function ($scope, $window, $location, $http) {
  var checkAvailability = function (type) {
    return $http.post('api/check-db', {toCheck: type})
    .then(function (response) {
      return response
    })
  }
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
      // TODO: set ng animate to brightly color the button when this all passes
      // TODO: also maybe do a db call to check if any of these names exists, if they do tell user
      $scope.allPass = true;
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
        // $scope.emailConfirmError = null;
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
      // TODO: also maybe do a db call to check if any of these names exists, if they do tell user
      $scope.allPass = true;
    }
  }
  $scope.checkDb = function (input) {
    if (input === 'name') {
      if ($scope.handleError === null) {
        checkAvailability($scope.userHandle)
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
        checkAvailability($scope.email)
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
        if (response.data) {
          $scope.allPass = false;
          $scope.handleError = response.data.handleErrors
          $scope.passwordError = response.data.passwordErrors
          $scope.emailError = response.data.emailArray
          //something went wrong
          console.log(response.data);
        }
        else {
          console.log('passed');
        }
      })
    }
    else {
      // TODO: display error to user that info needs to be filled in
    }
  }
  //use to clear form info (or anything else for that matter)
  $scope.clearForm = function () {
  }
}])
