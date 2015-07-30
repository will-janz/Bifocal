'use strict';


angular.module('OBB.controllers.homeCtrl', []).
    controller('HomeCtrl', ['$scope', 'Site', '$http', '$log', '$location', function($scope, Site, $http, $log, $location) {
        Site.vertical = "main";
        Site.title = "Home";
        Site.page = "home";
        Site.hideSearch = false;
        Site.joinUrl = 'home';

        $scope.login = function(data) {
            $scope.loginError = undefined;
            Site.user.credentials = btoa(data.email + ':' + data.password);
            var url = Site.cfg.apiHost + 'user';

            $http.get(url, {
                headers: { 'authorization': 'basic ' + Site.user.credentials }
            }).success(function(data, status) {
                    $log.debug('login Status - ' + JSON.stringify(status));
                    $log.debug('links - ' + JSON.stringify(data.links));
                    Site.user.isLoggedIn = true;

                    // Parse user links
                    Site.user.links = {
                        self:           (_.findWhere(data.links, {'rel': 'self'})).href,
                        search:         (_.findWhere(data.links, {'rel': 'search'})).href,
                        myCompanies:    (_.findWhere(data.links, {'rel': 'myCompanies'})).href,
                        myCustomers:    (_.findWhere(data.links, {'rel': 'myCustomers'})).href,
                        myVendors:      (_.findWhere(data.links, {'rel': 'myVendors'})).href,
                        myFavorites:    (_.findWhere(data.links, {'rel': 'myFavorites'})).href
                    }

                    $log.debug('user ' + JSON.stringify(data));
                    $location.path('/myCompanies');
                }).error(function(data, status) {

                    // Show error message
                    switch(status) {
                        case 401:
                            $scope.loginError = "Login failed, please check your information and try again.";
                            break;
                        default:
                            $scope.loginError = "An unknown error occurred, please try again.";
                    }

                    Site.user.credentials = null;
                });
        };

        $scope.newUser = {'email': '', 'password': ''};
        $scope.register = function (data) {
            $scope.joinError = undefined;
            Site.user.credentials = btoa(data.email + ':' + data.password);

            $http.post(Site.cfg.apiHost + 'users', data).
                success(function(data, status){
                    $log.debug('register status - ' + JSON.stringify(status));
                    Site.user.isLoggedIn = true;
                    Site.user.links = {
                        self:           (_.findWhere(data.links, {'rel': 'self'})).href,
                        search:         (_.findWhere(data.links, {'rel': 'search'})).href,
                        myCompanies:    (_.findWhere(data.links, {'rel': 'myCompanies'})).href,
                        myCustomers:    (_.findWhere(data.links, {'rel': 'myCustomers'})).href,
                        myVendors:      (_.findWhere(data.links, {'rel': 'myVendors'})).href,
                        myFavorites:    (_.findWhere(data.links, {'rel': 'myFavorites'})).href
                    }
                    $location.path('/myCompanies');
                }).
                error(function(data, status) {

                    // Invalidate login
                    Site.user.isLoggedIn = false;

                    // display an error
                    switch(status) {
                        case 409:
                            $scope.joinError = "That email is already in use.";
                            break;
                        default:
                            $scope.joinError = "An unknown error occurred, please try again.";
                    }

                    $log.debug('Status - ' + JSON.stringify(status));
                    $log.debug(JSON.stringify(data));
                });
        }
    }]);