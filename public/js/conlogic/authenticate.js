var authentication = function (testCase, text) {
  var illegals = /\W/;
  var errorArray = [];
  if (text === 'User name') {
    if (testCase.length < 5 && testCase != 0) {
      errorArray.push(text + ' must be longer than 4 characters');
    }
    if (testCase.length > 15) {
      errorArray.push(text + ' must be less than 15 characters');
    }
    if (illegals.test(testCase)) {
      errorArray.push(text + ' contains illegal characters. Can only use letters, numbers and underscores (no spaces)');
    }
  }
  if (testCase === undefined || !testCase.replace(/\s/g, '').length) {
    errorArray.push(text + ' can not be blank');
  }
  if (text === 'Password') {
    if (testCase.length < 6 && testCase != 0) {
      errorArray.push(text + ' must be greater than 5 characters');
    }
    if (testCase.length >= 31) {
      errorArray.push(text + ' may not be more than 30 characters');
    }
  }
  if (text === 'Email') {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (filter.test(testCase)) {
    }
    else {
      errorArray.push("Please input a valid email address")
    }
  }
  return errorArray;
}
