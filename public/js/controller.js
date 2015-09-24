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
      $scope.allPass = true;
    }
  }
  $scope.accountCreation = function () {
    var userName = $scope.userHandle;
    var email = $scope.email;
    var emailConfirm = $scope.emailConfirm;
    var password = $scope.password;
    var passwordConfirm = $scope.passwordConfirm;
    //make call to server, do same checks as above. If pass, load new partial, else display errors
    $http.post('api/authenticate', {userName: userName, email: email, emailConfirm: emailConfirm, password: password, passwordConfirm: passwordConfirm})
    .then(function (response) {
      return 'output depends on pass or failure return'
    })
  }
  //use to clear form info (or anything else for that matter)
  $scope.clearForm = function () {
  }
}])
