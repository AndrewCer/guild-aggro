module.exports = {
  authentication: function (input) {
    var illegals = /\W/;
    var errorArray = [];
    var errorObj = {};
    var spacesTest = name.split(' ');
    if (input.length < 5) {
      errorArray.push('Username is too short. Must be longer than 4 characters');
    }
    if (input.length > 15) {
      errorArray.push('Username is too long. Must be less than 15 characters');
    }
    if (illegals.test(name)) {
      errorArray.push('Username contains illegal characters. Can only use letters, numbers and underscores (no spaces)');
    }
    if (password.length < 6) {
      errorArray.push('Password is too short. Must be greater than 5 characters');
    }
    if (password != passwordCheck) {
      errorArray.push('Passwords do not match');
    }
    return errorArray;
  }
}
