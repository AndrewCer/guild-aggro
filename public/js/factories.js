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

app.factory('dbCheck', function ($http) {
  return {
    getCheck: function (type) {
      return $http.post('api/check-db', {toCheck: type})
    }
  }
})
