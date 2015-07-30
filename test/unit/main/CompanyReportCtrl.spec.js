'use strict';

describe('My Companies', function() {
    
    beforeEach(module('OBB'));
    
    describe('when the user is not logged in', function() {
        var ctrl, scope, site, $httpBackend, location;

        beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_, $location) {
            
            $httpBackend = _$httpBackend_;

            scope = $rootScope.$new();
            site = Site;
            location = $location;
            ctrl = $controller('CompanyReportCtrl', {$scope: scope, Site: site, $location: location});
        }));
        
        
        it('should set initial Site attributes', function() {
            expect(site.vertical).toEqual("main");
            expect(site.page).toEqual("companyReport");
            expect(site.title).toEqual("Company Report");
        });
    });
    
    describe('when the user is logged in', function() {
        var ctrl;
        var scope;
        var site;
        var $httpBackend;
        var location;
        var routeParams;
        var data;

        beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_, $location, $routeParams) {
            
            $httpBackend = _$httpBackend_;

            scope = $rootScope.$new();
            Site.user.isLoggedIn = true;
            site = Site;
            location = $location;
            routeParams = $routeParams;
            data = {"redacted": "for confidentiality reasons"};
            ctrl = $controller('CompanyReportCtrl', {$scope: scope, Site: site, $location: location, $routeParams: routeParams});
        }));

        it('should set initial Site attributes', function() {
            var url = site.cfg.apiHost + 'companies/undefined/report';
            $httpBackend.expectGET(url).respond(200, data);
            $httpBackend.flush();

            expect(site.vertical).toEqual("main");
            expect(site.page).toEqual("companyReport");
            expect(site.title).toEqual("KEOKEA HAWAIIAN HOMES FARMERS ASSOCIATION - Company Details");
            expect(scope.subPage).toBe("Summary");
            expect(scope.report).toEqual(data);
            expect(scope.score1).toEqual(data.company.rating.overall);
            expect(scope.score2).toEqual(100 - data.company.rating.overall);
            expect(scope.myCustomerChecked).toBe(true);
            expect(scope.myFavoriteChecked).toBe(true);
            expect(scope.myVendorChecked).toBe(true);
        });

        it('should remove a company when toggleFollow(myCompany)', function(){
            var url = site.cfg.apiHost + 'companies/undefined/report';
            var url2 = site.cfg.apiHost + '[REDACTED]';
            $httpBackend.expectGET(url).respond(200, data)

            expect(scope.toggleFollowVerb).toBe('');
            $httpBackend.flush();
            $httpBackend.expectDELETE(url2).respond(200);
            scope.toggleFollow('myCompany');
            $httpBackend.flush();
            expect(scope.toggleFollowVerb).toBe('Removed');

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should remove a company when toggleFollow(myCustomer)', function(){
            var url = site.cfg.apiHost + 'companies/undefined/report';
            var url2 = site.cfg.apiHost + 'users/[REDACTED]/customers/21VCNS3K5N';
            $httpBackend.expectGET(url).respond(200, data)

            expect(scope.toggleFollowVerb).toBe('');
            $httpBackend.flush();
            $httpBackend.expectDELETE(url2).respond(200);
            scope.toggleFollow('myCustomer');
            $httpBackend.flush();
            expect(scope.toggleFollowVerb).toBe('Removed');

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should remove a company when toggleFollow(myFavorite)', function(){
            var url = site.cfg.apiHost + 'companies/undefined/report';
            var url2 = site.cfg.apiHost + 'users/[REDACTED]/favorites/21VCNS3K5N';
            $httpBackend.expectGET(url).respond(200, data)

            expect(scope.toggleFollowVerb).toBe('');
            $httpBackend.flush();
            $httpBackend.expectDELETE(url2).respond(200);
            scope.toggleFollow('myFavorite');
            $httpBackend.flush();
            expect(scope.toggleFollowVerb).toBe('Removed');

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should remove a company when toggleFollow(myVendor)', function(){
            var url = site.cfg.apiHost + 'companies/undefined/report';
            var url2 = site.cfg.apiHost + 'users/[REDACTED]/vendors/21VCNS3K5N';
            $httpBackend.expectGET(url).respond(200, data)

            expect(scope.toggleFollowVerb).toBe('');
            $httpBackend.flush();
            $httpBackend.expectDELETE(url2).respond(200);
            scope.toggleFollow('myVendor');
            $httpBackend.flush();
            expect(scope.toggleFollowVerb).toBe('Removed');

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});