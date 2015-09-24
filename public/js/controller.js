app.controller('MasterController', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
  $scope.closeModal = function () {
    $location.path('/');
    $location.hash('portfolio');
    $anchorScroll();
  }
}])

app.controller('SplashController', ['$scope', function ($scope) {

}])

app.controller('InitSignUpController', ['$scope', '$window', '$location', function ($scope, $window, $location) {
  $scope.instaValidation = function (input, spot) {
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
      $scope.handleError = null;
      $scope.passwordError = null;
      $scope.emailError = null;
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
      $scope.emailConfirmError = null;
      $scope.passwordConfirmError = null;
    }
  }
  $scope.accountCreation = function () {
    var userName = $scope.userHandle;
    var email = $scope.email;
    var emailConfirm = $scope.emailConfirm;
    var password = $scope.password;
    var passwordConfirm = $scope.passwordConfirm;
    if(authentication(userName, "User name").length != 0) {
      $scope.handleError = authentication(userName, 'User name');
    }
    else {
      $scope.handleError = null;
    }
  }
  //use to clear form info (or anything else for that matter)
  $scope.clearForm = function () {
  }
}])
