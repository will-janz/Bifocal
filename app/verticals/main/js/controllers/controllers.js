'use strict';

/** Sub-main controllers **/
// TODO: Figure out how to separate these into individual files

angular.module('v_main.controllers', []).
    controller('MyCompaniesCtrl', ['$scope', '$http', 'Site', '$location', '$log', function($scope, $http, Site, $location, $log) {
        
        // If the user is not logged in,
        if(!Site.user.isLoggedIn) {
            // redirect them to the "premium" page,
            $location.path('/premium');
            // and hop out of the controller
            return;
        }
        
        Site.vertical = "main";
        Site.page = 'myCompanies';
        Site.title = 'My Companies';
        
        $scope.cards = {};

        var url = Site.user.links.myCompanies;

        $http.get(url, {
            headers: { 'authorization': 'basic ' + Site.user.credentials }
        }).
        success(function(data, status) {
            $log.debug('GET status: ' + status);
            $scope.cards = data;
        }).
        error(function(data, error){
            $log.error(JSON.stringify(error));
            // TODO: Display an error message
        });
    }]).
    controller('MyCustomersCtrl', ['$scope', '$http', 'Site', '$location', '$log', function($scope, $http, Site, $location, $log) {
        
        // If the user is not logged in,
        if(!Site.user.isLoggedIn) {
            // redirect them to the "premium" page,
            $location.path('/premium');
            // and hop out of the controller
            return;
        }
        
        Site.vertical = "main";
        Site.page = 'myCustomers';
        Site.title = 'My Customers';
        
        $scope.cards = {};

        var url = Site.user.links.myCustomers;
        
        // Pull user's customers
        $http.get(url, {
            headers: { 'authorization': 'basic ' + Site.user.credentials }
        }).
        success(function(data, status) {
            $log.debug('GET status: ' + status);
            $scope.cards = data;
        }).
        error(function(data, error){
            $log.error(JSON.stringify(error));
            // TODO: Display an error message
        });
    }]).
    controller('MyVendorsCtrl', ['$scope', '$http', 'Site', '$location', '$log', function($scope, $http, Site, $location, $log) {
        
        // If the user is not logged in,
        if(!Site.user.isLoggedIn) {
            // redirect them to the "premium" page,
            $location.path('/premium');
            // and hop out of the controller
            return;
        }
        
        Site.vertical = "main";
        Site.page = 'myVendors';
        Site.title = 'My Vendors';
        
        $scope.cards = {};

        var url = Site.user.links.myVendors;
        
        // Pull user's vendors
        $http.get(url, {
            headers: { 'authorization': 'basic ' + Site.user.credentials }
        }).
        success(function(data, status) {
            $log.debug('GET status: ' + status);
            $scope.cards = data;
        }).
        error(function(data, error){
            $log.error(JSON.stringify(error));
            // TODO: Display an error message
        });
    }]).
    controller('MyFavoritesCtrl', ['$scope', '$http', 'Site', '$location', '$log', function($scope, $http, Site, $location, $log) {
        
        // If the user is not logged in,
        if(!Site.user.isLoggedIn) {
            // redirect them to the "premium" page,
            $location.path('/premium');
            // and hop out of the controller
            return;
        }
        
        Site.vertical = "main";
        Site.page = 'myFavorites';
        Site.title = 'My Favorites';
        
        $scope.cards = {};

        var url = Site.user.links.myFavorites;
        
        // Pull user's favorites
        $http.get(url, {
            headers: { 'authorization': 'basic ' + Site.user.credentials }
        }).
        success(function(data, status) {
            $log.debug('GET status: ' + status);
            $scope.cards = data;
        }).
        error(function(data, error) {
            $log.error(JSON.stringify(error));
            // TODO: Display an error message
        });
    }]).
    controller('AccountCtrl', ['$scope', '$http', 'Site', '$location', '$log', function($scope, $http, Site, $location, $log) {
        
        // TODO: If the user isn't logged in, redirect to a login page and display a notice
        
        Site.vertical = "main";
        Site.page = 'account';
        Site.title = 'My Account';
    }]).
    controller('PremiumCtrl', ['$scope', 'Site', '$http', '$log', '$routeParams', '$location', function($scope, Site, $http, $log, $routeParams, $location){
        Site.vertical = "main";
    }]).
    controller('CompanyReportCtrl', ['$scope', 'Site', '$http', '$log', '$routeParams', '$location', 'growl',
        function($scope, Site, $http, $log, $routeParams, $location, growl) {
        
        Site.vertical = "main";
        Site.page = 'companyReport';
        Site.title = 'Company Report';
        $scope.score1 = 0;
        $scope.score2 = 0;
        $scope.toggleFollowVerb = '';

        // Subpage stuff
        $scope.subPage = "Summary";
        $scope.setSubPage = function(subPage) {
            $scope.subPage = subPage;
        };

        /**
            adds/removes the company from the user's my* collection.
        **/
        $scope.toggleFollow = function(data){
            $log.debug('toggleFollow - ' + data);
            var url;
            var method = 'PUT';

            $log.debug('links - ' + JSON.stringify($scope.report.links));

            // find if need to add or delete.
            if(data === 'myCompany'){
                var link = _.findWhere($scope.report.links, {'rel': 'addCompany'});
                $log.debug('link - ' + JSON.stringify(link));
                if(link){
                    url = link.href;
                }
                else{
                    url =  (_.findWhere($scope.report.links, {'rel': 'removeCompany'})).href;
                    method = 'DELETE';
                }
            }
            else if(data === 'myCustomer'){
                var link = _.findWhere($scope.report.links, {'rel': 'addCustomer'});
                $log.debug('link - ' + JSON.stringify(link));
                if(link){
                    url = link.href;
                }
                else{
                    url =  (_.findWhere($scope.report.links, {'rel': 'removeCustomer'})).href;
                    method = 'DELETE';
                }
            }
            else if(data === 'myVendor'){
                var link = _.findWhere($scope.report.links, {'rel': 'addVendor'});
                $log.debug('link - ' + JSON.stringify(link));
                if(link){
                    url = link.href;
                }
                else{
                    url =  (_.findWhere($scope.report.links, {'rel': 'removeVendor'})).href;
                    method = 'DELETE';
                }
            }
            else if(data === 'myFavorite'){
                var link = _.findWhere($scope.report.links, {'rel': 'addFavorite'});
                $log.debug('link - ' + JSON.stringify(link));
                if(link){
                    url = link.href;
                }
                else{
                    url =  (_.findWhere($scope.report.links, {'rel': 'removeFavorite'})).href;
                    method = 'DELETE';
                }
            }

            if(!url){
                return;
            }

            $log.debug('putting - ' + url);
            var config = {
                method: method,
                url: url,
                withCredentials: true,
                headers: {
                    'authorization': 'basic ' + Site.user.credentials
                }
            };
            $log.debug('config - ' + JSON.stringify(config));

            $http(config).
            success(function(data, status) {
                
                $log.debug('status - ' + status);

                if(method === 'PUT'){
                    $scope.toggleFollowVerb = 'Added';
                }
                else{
                    $scope.toggleFollowVerb = 'Removed';
                }
                
                growl.addSuccessMessage($scope.toggleFollowVerb + ' ' + $scope.report.company.name + '.');

            }).error(function(data, status) {
                $log.error('error posting ' + url + ' -- status: ' + status);
            });
        }

        $scope.myCustomerChecked = false;
        $scope.myVendorChecked = false;
        $scope.myFavoriteChecked = false;

        // get the report data and set the associated scope properties
        var url;
        // TODO: Do not pull userId from routeParams. pull from other storage.
        if($routeParams.userId){
            url = Site.cfg.apiHost + 'users/' +  $routeParams.userId + '/companies/' + $routeParams.companyId + '/report';
        }
        else{
            url = Site.cfg.apiHost + "companies/" + $routeParams.companyId + "/report";
        }

        $log.debug('GET company report: ' + url);
        $log.debug('company record credentials: ' + Site.user.credentials);


        $http.get(url, {
                headers: { 'authorization': 'basic ' + Site.user.credentials }
            }).
            success(function(data, status) {
                $log.debug('GET status: ' + status);
                Site.title = data.company.name + ' - Company Details';
                $log.debug('Company everything');
                $log.debug(data);
                $scope.report = data;
                $scope.score1 =  data.company.rating.overall;
                $scope.score2 = 100 - $scope.score1;

                $log.debug('score - ' + $scope.score);

                var link = _.findWhere($scope.report.links, {'rel': 'removeCompany'});
                $log.debug('link - ' + JSON.stringify(link));
                if(link){
                        // do something with the state of this button.
                }

                link = _.findWhere($scope.report.links, {'rel': 'removeCustomer'});
                $log.debug('link - ' + JSON.stringify(link));
                if(link){
                    $scope.myCustomerChecked = true;
                }

                link = _.findWhere($scope.report.links, {'rel': 'removeVendor'});
                $log.debug('link - ' + JSON.stringify(link));
                if(link){
                    $scope.myVendorChecked = true;
                }

                link = _.findWhere($scope.report.links, {'rel': 'removeFavorite'});
                $log.debug('link - ' + JSON.stringify(link));
                if(link){
                    $scope.myFavoriteChecked = true;
                }
            }).error(function(data, status) {
                // TODO: specific page for errors
                $location.path('/home');
            });
    }]);