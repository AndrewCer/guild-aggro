app.controller('initSignUp', ['$scope', function ($scope) {
  $scope.initSignUpSubmit = function () {
    var validationArray = [$scope.guildName, $scope.realName, $scope.userHandle]
    var errorArray = []
    for (var i = 0; i < validationArray.length; i++) {
      var outcome = authentication(validationArray[i])
      if (Object.keys(outcome).length != 0) {
        errorArray.push(outcome)
      }
    }
    //if there are no input errors, continue, else v
    // TODO: else: display errors
    if (errorArray.length === 0) {
      console.log('all clear');
    }
    else {
      console.log('some error needs to be displayed to user');
    }
  }
  //use to clear form info (or anything else for that matter)
  $scope.clearForm = function () {
  }
}])
