app.factory('UserStore', function () {
  var obj = {};
  var userInformation = [];
  obj.userInfo = function (inputObj) {
    userInformation.push(inputObj);
    return userInformation;
  }
  obj.user = userInformation;
  return obj
})
