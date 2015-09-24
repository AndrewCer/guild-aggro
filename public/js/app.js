var app = angular.module('guildAggro', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/splash.html',
      controller: 'SplashController'
    })
    $locationProvider.html5Mode(true);
}])
