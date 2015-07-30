'use strict';

/** Dependencies **/
var app = angular.module('OBB', [
    'ngRoute',
    'OBB.filters',
    'OBB.services',
    'OBB.directives',
    'OBB.controllers',
    'OBB.controllers.homeCtrl',
    'angular-underscore',
    'angular-growl',
    'v_main',
    'v_CRE'
]);

/** Configuration **/
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    // Shared page route
    $routeProvider.
        when('/home',           {templateUrl: 'partials/pages/home.html',           controller: 'HomeCtrl'}).
        when('/about',          {templateUrl: 'partials/pages/about.html',          controller: 'AboutCtrl'}).
        when('/better',         {templateUrl: 'partials/pages/better.html',         controller: 'BetterCtrl'}).
        when('/contact',        {templateUrl: 'partials/pages/contact.html',        controller: 'ContactCtrl'}).
        when('/news',           {templateUrl: 'partials/pages/news.html',           controller: 'NewsCtrl'}).
        when('/news/:story',    {templateUrl: 'partials/pages/newsStory.html',      controller: 'NewsStoryCtrl'}).
        when('/signIn',         {templateUrl: 'partials/pages/signIn.html',         controller: 'SignInCtrl'}).
        otherwise({redirectTo: '/cre/home'});
        
    // Use HTML5 routing method
    $locationProvider.html5Mode(true);
}]);

// Prevents page from jumping to the top on navigation
app.value('$anchorScroll', angular.noop);

