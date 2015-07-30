'use strict';

/* Unit tests for each function of the App controller
 * The app controller is the top parent controller
 * with 1 controller nested within it. The nested controller changes based
 * on the route.
 */

// TODO: After auditing the AppCtrl, rebuild this
describe('AppCtrl', function() {
    beforeEach(module('OBB'));

    var scope;
    var ctrl;
    var $httpBackend;
    var site;
    var location;
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, Site, $templateCache, $location) {
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        site = Site;
        location = $location;
        
        //spyOn($rootScope, '$emit');
        
        ctrl = $controller('AppCtrl', {$scope: scope, Site: site});
        $templateCache.put('verticals/CRE/partials/pages/cre_home.html', "Nothing because this is a test.");
    }));
    
    describe('when the view changes', function() {
        
        it('should fire a $viewContentLoaded event', function() {
            scope.$broadcast("$viewContentLoaded");
        });
    });
    
    describe('Search object', function() {
        
        var validData = [
            {
                "_id": "248408120"
            }
        ];
                
        it('should have the results hidden at first', function() {
            expect(scope.search.hideResults).toBe(true);
        });
        
        it('should bring stuff up and show it', function() {
            $httpBackend.expectGET(site.cfg.apiHost + 'companies?search=test').respond(200, validData);
            expect(scope.cards).toBeUndefined();
            scope.search.do({query: 'test'});
            $httpBackend.flush();
            expect(scope.cards).toEqual(validData);
            expect(scope.search.hideResults).toBe(false);
        });

        it('should hide results and scrap cards when server 404s', function(){
            $httpBackend.expectGET(site.cfg.apiHost + 'companies?search=test').respond(404, {});
            scope.search.do({query: 'test'});
            $httpBackend.flush();
            expect(scope.cards).toBe(null);
            expect(scope.search.hideResults).toBe(true);
        })

        it('should hide results when data is undefined', function(){
            scope.search.do(undefined);
            expect(scope.search.hideResults).toBe(true);
        });
    
    });

    describe('navigate', function() {
        it('should navigate to the correct url', function(){

            var data = '{"links":[{"rel":"report","href":"' + site.cfg.apiHost + 'companies/[REDACTED]/report"}]}';
            scope.navigateReport(JSON.parse(data));
            expect(scope.search.hideResults).toBe(true);
            expect(location.path()).toBe('/companies/[REDACTED]/report');
        });
    });

    describe('signOut', function() {
        it('should sign the user out', function(){
            scope.signOut();
            expect(site.user.credentials).toBe('');
            expect(site.user.isLoggedIn).toBe(false);
        });
    });
});