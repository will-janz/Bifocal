'use strict';

/** Controllers **/
// TODO: Figure out how to separate these into individual files

angular.module('v_CRE.controllers', []).
    controller('CRE_HomeCtrl', ['$scope', 'Site', '$http', function($scope, Site, $http) {
        Site.vertical = "CRE";
        Site.page = "cre_home";
        Site.title = "Commercial Real Estate";
        Site.joinUrl = "join";

        $http.get('tempAPI/news.json').success(function(data) {
            $scope.news = data.reverse();
        });
    }]).
    controller('CRE_CheckCreditCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.vertical = "CRE";
        Site.title = 'Check Credit';
        Site.page = 'checkCredit';
    }]).
    controller('CRE_KeyScreenCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.vertical = "CRE";
        Site.title = 'Key Screen';
        Site.page = 'keyScreen';
    }]).
    controller('CRE_RentRollCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.vertical = "CRE";
        Site.title = 'Rent Roll Audit';
        Site.page = 'rentRoll';
    }]).
    controller('CRE_PricingCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.vertical = "CRE";
        Site.title = 'Pricing';
        Site.page = 'pricing';
    }]).
    controller('CRE_TestimonialsCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.vertical = "CRE";
        Site.title = 'Testimonials';
        Site.page = 'testimonials';
    }]).
    controller('CRE_JoinCtrl', ['$scope', '$http', 'Site', '$location', '$log', function($scope, $http, Site, $location, $log) {
        Site.vertical = "CRE";
        Site.title = 'Join';
        Site.page = 'join';
    }]).
    controller('CRE_BuyCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.vertical = "CRE";
        Site.title = 'Buy Now';
        Site.page = 'buy';
    }]).
    controller('CRE_ThankYouCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.vertical = "CRE";
        Site.title = 'Thank You!';
    }]);