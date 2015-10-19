var app = angular.module('guildAggro', ['ngRoute', 'ngAnimate', 'ngCookies']);

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
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    })
    .when('/guild-creation', {
      templateUrl: 'partials/guild-creation.html',
      controller: 'GuildCreationController'
    })
    .when('/blue-template', {
      templateUrl: 'partials/blue-temp.html',
      controller: 'BlueController'
    })
    .when('/guild/:gDomain', {
      templateUrl: 'partials/guild-page.html',
      controller: 'GuildController'
    })
    .when('/temp-guild-creation', {
      templateUrl: 'partials/temp-guild-creation.html',
      controller: 'GuildCreationController'
    })
    .otherwise('/')
    $locationProvider.html5Mode(true);
}])
