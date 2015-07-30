'use strict';

/** Controllers **/
// TODO: Figure out how to separate these into individual files

angular.module('OBB.controllers', []).
    controller('AppCtrl', ['$scope', '$route', '$http', 'Site', '$log', '$location', '$window',
        function($scope, $route, $http, Site, $log, $location, $window) {

        // TODO: How does one test this?
        $scope.$on('$viewContentLoaded', function(event) {
            // Google analytics quickpatch. Sends a page view to Google Analytics
            try {
                $window.ga('send', 'pageview');
            } catch(e) {
                $log.error("Invalid ga call.");
            }
            
            // Slightly less hackish style manipulation
            try {
                $("#stretchy > div:not(.all)").css("min-height", $("#view").css("height"));   
            } catch(e) {
                $log.debug("Could not into jQuery.");
            }
        });

        // Set scope references
        $scope.$route = $route;
        $scope.Site = Site;

        /*
         * Search
         * Search is available on every page, and is thus put in the
         * main application controller.
         */
        $scope.search = {
            hideResults: true, // Search results visibility
            
            // Performs a search
            do: function(data) {
                
                if(data === undefined || data.query === undefined || data.query.length === undefined || data.query.length == 0) {
                    $scope.search.hideResults = true; // TODO: This feels dirty. See why this.hideResults won't work
                } else {
                    
                    // Generate the URL to pull results from
                    var url =  Site.user.links.search + '=' + encodeURIComponent(data.query);
                    
                    if(data.state) {
                        url += '&state=' + encodeURIComponent(data.state);
                    }
                    $log.debug('Search URL: ' + url);
                    
                    // Pull search results from API
                    $http.get(url, {
                        headers: { 'authorization': 'basic ' + Site.user.credentials }
                    }).success(function(data, status) {
                        $log.debug('GET: searchStatus: ' + status);
                        $scope.cards = data;
                        $scope.search.hideResults = false;
                    }).error(function(data, status) {
                        // TODO: Display an error of some sort
                        $log.error("Search error: " + status);
                        $scope.cards = null;
                        $scope.search.hideResults = true;
                    });
                }
            }
        }

        /**
            We have different links depending upon if the user is authenticated or not.
            We cannot hard-code a href in the partial.
            
        **/
        $scope.navigateReport = function(data) {
            var report = _.findWhere(data.links, {'rel':'report'});
            var url = (_.findWhere(data.links, {'rel': 'report'})).href;
            var parts = url.split(Site.cfg.apiHost);
            $location.path(parts[1]);
            $scope.search.hideResults = true;
        }
        /** End all-page search **/

        $scope.signOut = function() {
            Site.user.credentials = '';
            Site.user.isLoggedIn = false;
            Site.user.links.search = Site.cfg.apiHost + 'companies?search';
        }

    }]).
    controller('AboutCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.title = 'About Ben';
        Site.page = 'about';
    }]).
    controller('BetterCtrl', ['$scope', 'Site', '$log', function($scope, Site, $log) {
        Site.title = 'Ben is Better';
        Site.page = 'better';
    }]).
    controller('ContactCtrl', ['$scope', 'Site', function($scope, Site) {
        Site.title = 'Contact Ben';
        Site.page = 'contact';
    }]).
    controller('NewsCtrl', ['$scope', 'Site', '$http', function($scope, Site, $http) {
        Site.title = 'News';
        Site.page = 'news';

        $http.get('tempAPI/news.json').success(function(data) {
            $scope.articles = data.reverse();
        });
    }]).
    controller('NewsStoryCtrl', ['$scope', 'Site', '$routeParams', '$http', '$log', function($scope, Site, $routeParams, $http, $log) {
        Site.title = 'News';
        Site.page = 'news';

        $http.get('tempAPI/news.json').success(function(data) {
            $log.debug($routeParams);
            $scope.article = data[$routeParams.story - 1];
            $scope.articleCount = data.length;
            $log.debug(data);
        });

        $scope.articleUrl = "tempAPI/newsArticle-" + $routeParams.story + ".html";
    }]);