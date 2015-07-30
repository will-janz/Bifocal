// Main Home controller spec

'use strict';

describe('Home controller', function() {
    
    beforeEach(module('OBB'));
    
    var ctrl, scope, site, $httpBackend;
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, Site) {
        
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        site = Site;
        ctrl = $controller('HomeCtrl', {$scope: scope, Site: site});
    }));
    
    it('should set initial Site attributes', function() {
        expect(site.vertical).toEqual("main");
        expect(site.page).toEqual("home");
        expect(site.title).toEqual("Home");
    });
    
    describe('authentication', function() {
        
        var validLoginInfo = {email: '[REDACTED]', password: 'correcthorsebatterystaple'};
        var invalidLoginInfo = {email: '[REDACTED]', password: '313375u'};
        var mockAPIUser = {
            "_id": "1337",
            "_type": "vertex",
            "vertexType": "User",
            "email": "[REDACTED]",
            "level": "",
            "companyId": "",
            "accountPlan": "",
            "password": "somereallylonghashwithsomesortofsalt",
            "companies": [],
            "customers": [],
            "vendors": [ ],
            "favorites": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://[REDACTED]/users/user@obb.com"
                },
                {
                    "rel": "search",
                    "href": "http://[REDACTED]/users/user@obb.com/companies?search"
                },
                {
                    "rel": "myCompanies",
                    "href": "http://[REDACTED]/users/user@obb.com/companies"
                },
                {
                    "rel": "myCustomers",
                    "href": "http://[REDACTED]/users/user@obb.com/customers"
                },
                {
                    "rel": "myVendors",
                    "href": "http://[REDACTED]/users/user@obb.com/vendors"
                },
                {
                    "rel": "myFavorites",
                    "href": "http://[REDACTED]/users/user@obb.com/favorites"
                }
            ]
        };
        
        
        it('should log in a user that is registered', function() {
            // Before
            expect(scope.loginError).toBe(undefined);
            
            // During
            $httpBackend.expectGET(site.cfg.apiHost + 'user').respond(200, mockAPIUser);
            scope.login(validLoginInfo);
            $httpBackend.flush();
            
            // After
            expect(scope.loginError).toBe(undefined);
            expect(site.user.isLoggedIn).toBe(true);
            expect(site.user.credentials).toBe(btoa(validLoginInfo.email + ':' + validLoginInfo.password));
            expect(site.user.links).toEqual({
                self:        "http://[REDACTED]/users/user@obb.com",
                search:      "http://[REDACTED]/users/user@obb.com/companies?search",
                myCompanies: "http://[REDACTED]/users/user@obb.com/companies",
                myCustomers: "http://[REDACTED]/users/user@obb.com/customers",
                myVendors:   "http://[REDACTED]/users/user@obb.com/vendors",
                myFavorites: "http://[REDACTED]/users/user@obb.com/favorites"
            });
        });
        
        it('should display an error if invalid login info is supplied', function() {
            // Before
            expect(scope.loginError).toBe(undefined);
            
            // During
            $httpBackend.expectGET(site.cfg.apiHost + 'user').respond(401);
            scope.login(invalidLoginInfo);
            $httpBackend.flush();
            
            // After
            expect(scope.loginError).toBe("Login failed, please check your information and try again.");
            expect(site.user.isLoggedIn).toBe(false);
            expect(site.user.credentials).toBe(null);
            expect(site.user.links).toEqual({
                self: null,
                search: site.cfg.apiHost + 'companies?search'
            });
        });
        
        it('should display an error if the server derps', function() {
            // Before
            expect(scope.loginError).toBe(undefined);
            
            // During
            $httpBackend.expectGET(site.cfg.apiHost + 'user').respond(500);
            scope.login(invalidLoginInfo);
            $httpBackend.flush();
            
            // After
            expect(scope.loginError).toBe("An unknown error occurred, please try again.");
            expect(site.user.isLoggedIn).toBe(false);
            expect(site.user.credentials).toBe(null);
            expect(site.user.links).toEqual({
                self: null,
                search: site.cfg.apiHost + 'companies?search'
            });
        });
            
    });
    
});