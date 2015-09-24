var authentication = function (testCase, index) {
  var illegals = /\W/;
  var errorObj = {};
  if (testCase.length < 5) {
    errorObj.position = index;
    errorObj.tooShort = 'must be longer than 4 characters';
  }
  if (testCase.length > 15) {
    errorObj.position = index;
    errorObj.tooLong = 'must be less than 15 characters';
  }
  if (illegals.test(testCase)) {
    errorObj.position = index;
    errorObj.illegals = 'contains illegal characters. Can only use letters, numbers and underscores (no spaces)';
  }
  // if (password.length < 6) {
  //   $scope.passwordError = 'Password is too short. Must be greater than 5 characters';
  //   errorArray.push(true);
  // }
  // if (password != passwordCheck) {
  //   $scope.passwordMatchError = 'Passwords do not match';
  //   errorArray.push(true);
  // }
  return errorObj;
}
