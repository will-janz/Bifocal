'use strict';
/**
 * Sub-main routes and config
 */

/** Dependencies **/
var app = angular.module('v_main', [
    'ngRoute',
    'v_main.controllers'
]);

/** Configuration **/
app.config(['$routeProvider', function($routeProvider) {
    
    // Routing
    $routeProvider.
        when('/myCompanies',    {templateUrl: 'verticals/main/partials/pages/myCompanies.html',    controller: 'MyCompaniesCtrl'}).
        when('/myCustomers',    {templateUrl: 'verticals/main/partials/pages/myCustomers.html',    controller: 'MyCustomersCtrl'}).
        when('/myVendors',      {templateUrl: 'verticals/main/partials/pages/myVendors.html',      controller: 'MyVendorsCtrl'}).
        when('/myFavorites',    {templateUrl: 'verticals/main/partials/pages/myFavorites.html',    controller: 'MyFavoritesCtrl'}).
        when('/account',        {templateUrl: 'verticals/main/partials/pages/account.html',        controller: 'AccountCtrl'}).
        when('/premium',        {templateUrl: 'verticals/main/partials/pages/premiumContent.html', controller: 'PremiumCtrl'}).
        when('/companies/:companyId/report',
                                {templateUrl: 'verticals/main/partials/pages/companyReport.html',  controller: 'CompanyReportCtrl'}).
        when('/users/:userId/companies/:companyId/report',
                                {templateUrl: 'verticals/main/partials/pages/companyReport.html',  controller: 'CompanyReportCtrl'});
}]);
