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
    // TODO: if error, change class to highlight background red via the class .form-error
    // console.log(this);
    if (authentication(input, spot).length != 0) {
      if (spot === 'User name') {
        $scope.handleError = authentication(input, spot);
      }
      if (spot === 'Password') {
        $scope.passwordError = authentication(input, spot);
      }
      if (spot === 'Email') {
        $scope.emailError = authentication(input, spot);
      }
    }
    else {
      if (spot === 'User name') {
        $scope.handleError = null;
      }
      if (spot === 'Password') {
        $scope.passwordError = null;
      }
      if (spot === 'Email') {
        $scope.emailError = null;
      }
    }
  }
  $scope.samenessCheck = function (original, newInput, type) {
    if (original != newInput) {
      if (type === "email") {
        $scope.emailConfirmError = 'Email address does not match';
      }
      if (type === 'password') {
        $scope.passwordConfirmError = 'Password does not match';
      }
    }
    else {
      if (type === 'email') {
        $scope.emailConfirmError = null;
      }
      if (type === 'password') {
        $scope.passwordConfirmError = null;
      }
    }
    if ($scope.handleError === null && $scope.passwordError === null && $scope.emailError === null && $scope.emailConfirmError === null && $scope.passwordConfirmError === null) {
      // TODO: set ng animate to brightly color the button when this all passes
      // TODO: also maybe do a db call to check if any of these names exists, if they do tell user
      $scope.allPass = true;
    }
  }
  $scope.checkDb = function () {
    if ($scope.handleError === null) {
      checkAvailability($scope.userHandle)
      .then(function (value) {
        if (value.data === true) {
        // TODO: username is taken
        // setup ng-hide to respon to this and show a red x when the name is taken
        $scope.nameAvailable = false;
        }
        else {
        // TODO: say username is not taken maybe use font awesome green checkmark
          $scope.nameAvailable = true;
        }
      });
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
      $http.post('api/authenticate', {userName: userName, email: email, emailConfirm: emailConfirm, password: password, passwordConfirm: passwordConfirm})
      .then(function (response) {
        return 'if all passes set cookie w/ id and redirect'
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
