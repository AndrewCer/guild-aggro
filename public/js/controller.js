app.controller('initSignUp', ['$scope', function ($scope) {
  $scope.initSignUpSubmit = function () {
    $scope.guildShort = null;
    $scope.realName;
    $scope.email;
    $scope.userHandle;
    var validationArray = [$scope.guildName, $scope.realName, $scope.userHandle]
    // $scope.guildName;
    // $scope.realName;
    // $scope.email;
    // $scope.userHandle;
    var errorArray = []
    for (var i = 0; i < validationArray.length; i++) {
      var outcome = authentication(validationArray[i])
      if (Object.keys(outcome).length != 0) {
        errorArray.push(outcome)
      }
      else {
        break
      }
    }
    //if there are no input errors, continue, else v
    // TODO: else: display errors
    if (errorArray.length === 0) {
      console.log('all clear');
    }
  }
}])
