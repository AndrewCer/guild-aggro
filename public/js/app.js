var app = angular.module('guildAggro', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/testing', {
      templateUrl: 'partials/splash.html',
      controller: 'splashController'
    })
    $locationProvider.html5Mode(true);
}])
