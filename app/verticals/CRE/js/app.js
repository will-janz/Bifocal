'use strict';
/**
 * CRE sub-app route and config
 */

/** Dependencies **/
var app = angular.module('v_CRE', [
    'ngRoute',
    'v_CRE.controllers'
]);

/** Configuration **/
app.config(['$routeProvider', function($routeProvider) {
    
    // Routing
    $routeProvider.
        when('/cre/home',           {templateUrl: 'verticals/CRE/partials/pages/cre_home.html',       controller: 'CRE_HomeCtrl'}).
        when('/cre/checkCredit',    {templateUrl: 'verticals/CRE/partials/pages/checkCredit.html',    controller: 'CRE_CheckCreditCtrl'}).
        when('/cre/keyScreen',      {templateUrl: 'verticals/CRE/partials/pages/keyScreen.html',      controller: 'CRE_KeyScreenCtrl'}).
        when('/cre/rentRoll',       {templateUrl: 'verticals/CRE/partials/pages/rentRoll.html',       controller: 'CRE_RentRollCtrl'}).
        when('/cre/pricing',        {templateUrl: 'verticals/CRE/partials/pages/pricing.html',        controller: 'CRE_PricingCtrl'}).
        when('/cre/testimonials',   {templateUrl: 'verticals/CRE/partials/pages/testimonials.html',   controller: 'CRE_TestimonialsCtrl'}).
        when('/join',               {templateUrl: 'verticals/CRE/partials/pages/join.html',           controller: 'CRE_JoinCtrl'}).
        when('/buy',                {templateUrl: 'verticals/CRE/partials/pages/buy.html',            controller: 'CRE_BuyCtrl'}).
        when('/thankYou',           {templateUrl: 'verticals/CRE/partials/pages/thankYou.html',       controller: 'CRE_ThankYouCtrl'});
}]);
