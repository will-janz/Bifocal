'use strict';

/*
 * The account page is currently not in use
 * however this test exists for a starting place later on
 * and because I like it when stuff turns green
 */

describe('My Account', function() {
    
    beforeEach(module('OBB'));

    
    describe('when the user is logged in', function() {
        var ctrl, scope, site, $httpBackend, location;
        
        beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_, $location) {
            
            $httpBackend = _$httpBackend_;

            scope = $rootScope.$new();
            Site.user.isLoggedIn = true;
            site = Site;
            location = $location;
            ctrl = $controller('AccountCtrl', {$scope: scope, Site: site, $location: location});
        }));
        
        
        it('should set initial Site attributes (when the user is logged in)', function() {
            expect(site.vertical).toEqual("main");
            expect(site.page).toEqual("account");
            expect(site.title).toEqual("My Account");
        });
    });
});
