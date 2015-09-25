app.factory('UserStore', function () {
  var obj = {};
  var userInformation;
  obj.userInfo = function (inputObj) {
    userInformation = inputObj;
    return userInformation;
  }
  obj.user = userInformation;
  return obj
})
