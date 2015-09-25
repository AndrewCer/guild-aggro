var app = angular.module('guildAggro', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/splash.html',
      controller: 'SplashController'
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'InitSignUpController'
    })
    .when('/guild-creation', {
      templateUrl: 'partials/guild-creation.html',
      controller: 'GuildCreationController'
    })
    $locationProvider.html5Mode(true);
}])
