module.exports = {
  checkHandle: function (testCase) {
    var illegals = /\W/;
    var errorArray = [];
    if (testCase.length < 5 && testCase != 0) {
      errorArray.push('User name must be longer than 4 characters');
    }
    if (testCase.length > 15) {
      errorArray.push('User name must be less than 15 characters');
    }
    if (illegals.test(testCase)) {
      errorArray.push('User name contains illegal characters. Can only use letters, numbers and underscores (no spaces)');
    }
    if (testCase === undefined || !testCase.replace(/\s/g, '').length) {
      errorArray.push('User name can not be blank');
    }
    return errorArray;
  },
  checkPassword: function (testCase, passConfirm) {
    var errorArray = [];
    if (testCase === undefined || !testCase.replace(/\s/g, '').length) {
      errorArray.push('Password can not be blank');
    }
    if (testCase.length < 6 && testCase != 0) {
      errorArray.push('Password must be greater than 5 characters');
    }
    if (testCase.length >= 31) {
      errorArray.push('Password may not be more than 30 characters');
    }
    if (testCase != passConfirm) {
      errorArray.push('Password does not match')
    }
    return errorArray;
  },
  checkEmail: function (testCase, emailConfirm) {
    var errorArray = [];
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (filter.test(testCase)) {
    }
    else {
      errorArray.push("Please input a valid email address")
    }
    if (testCase != emailConfirm) {
      errorArray.push('Email does not match')
    }
    return errorArray;
  }
}
