'use strict';

/* Unit tests for each function of the App controller
 * The app controller is the top parent controller
 * with 1 controller nested within it. The nested controller changes based
 * on the route.
 */

describe('HomeCtrl', function() {
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
        ctrl = $controller('HomeCtrl', {$scope: scope, Site: site});
        $templateCache.put('verticals/CRE/partials/pages/cre_home.html', "Nothing because this is a test.");
    }));

    describe('register', function(){
        it('should register the user and give valid user status', function(){
            var data = {
                email: 'email',
                password: 'password'
            };
            var expected = '[REDACTED]';
            $httpBackend.expectPOST('', data).respond(201,JSON.parse(expected));

            expect(scope.joinError).toBe(undefined);
            scope.register(data);
            expect(site.user.credentials).toBe('ZW1haWw6cGFzc3dvcmQ=');
            $httpBackend.flush();

            expect(site.user.isLoggedIn).toBe(true);
            expect(site.user.links.self).toBe('http://[REDACTED]/users/[REDACTED]');
            expect(site.user.links.search).toBe('http://[REDACTED]/users/[REDACTED]/companies?search');
            expect(site.user.links.myCompanies).toBe('http://[REDACTED]/users/[REDACTED]/companies');
            expect(site.user.links.myCustomers).toBe('http://[REDACTED]/users/[REDACTED]/customers');
            expect(site.user.links.myVendors).toBe('http://[REDACTED]/users/[REDACTED]/vendors');
            expect(site.user.links.myFavorites).toBe('http://[REDACTED]/users/[REDACTED]/favorites');
        });

        it('should handle the state when the email already exists', function(){
            var data = {
                email: 'email',
                password: 'password'
            };
            $httpBackend.expectPOST('', data).respond(409);

            scope.register(data);
            expect(scope.joinError).toBe(undefined);
            $httpBackend.flush();

            expect(scope.joinError).toBe('That email is already in use.');
            expect(site.user.isLoggedIn).toBe(false);
        });

        it('should handle all other error states', function(){
            var data = {
                email: 'email',
                password: 'password'
            }
            $httpBackend.expectPOST('', data).respond(500);

            scope.register(data);
            expect(scope.joinError).toBe(undefined);
            $httpBackend.flush();

            expect(scope.joinError).toBe('An unknown error occurred, please try again.');
            expect(site.user.isLoggedIn).toBe(false);
        });
    });
});
