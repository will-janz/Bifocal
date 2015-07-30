'use strict';

describe('My Customers', function() {
    
    beforeEach(module('OBB'));
    
    
    describe('when the user is not logged in', function() {
        var ctrl, scope, site, $httpBackend, location;

        beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_, $location) {
            
            $httpBackend = _$httpBackend_;

            scope = $rootScope.$new();
            site = Site;
            location = $location;
            ctrl = $controller('MyCustomersCtrl', {$scope: scope, Site: site, $location: location});
        }));
                
        it('should redirect the user to a login page if they\'re not logged in', function() {
            expect(location.path()).toBe('/premium');
        });
    });
    
    describe('when the user is logged in', function() {
        var ctrl, scope, site, $httpBackend, location;
        
        beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_, $location) {
            
            $httpBackend = _$httpBackend_;

            scope = $rootScope.$new();
            Site.user.isLoggedIn = true;
            Site.user.links.myCustomers = "dumblink";
            site = Site;
            location = $location;
            ctrl = $controller('MyCustomersCtrl', {$scope: scope, Site: site, $location: location});
        }));
        
        
        it('should set initial Site attributes (when the user is logged in)', function() {
            expect(site.vertical).toEqual("main");
            expect(site.page).toEqual("myCustomers");
            expect(site.title).toEqual("My Customers");
        });
        
        it('should pull a user\'s customers', function() {
            $httpBackend.expectGET('dumblink').respond(200, "sumdata");
            $httpBackend.flush();
            expect(scope.cards).toBeDefined();
        });
        
        it('should display an error message if the server derps', function() {
            $httpBackend.expectGET('dumblink').respond(400);
            $httpBackend.flush();
            expect(scope.cards).toEqual({});
        });
    });
});
