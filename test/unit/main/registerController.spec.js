// 'use strict';

// describe('Register Controller Tests', function() {
//     beforeEach(module('OBB'));

//     describe('Register', function() {

//         var scope, ctrl, $httpBackend, site;

//         beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, Site) {
//             $httpBackend = _$httpBackend_;
//             scope = $rootScope.$new();
//             site = Site;
//             ctrl = $controller('LoginCtrl', {$scope: scope});
//         }));

//         it('should register a user with valid signup info', function() {
//             $httpBackend.expectPOST('http://localhost:8080/users').respond(201, {
//                 "id":"1",
//                 "email":"email@somewhere.com",
//                 "level":"Newbie",
//                 "companyId":"",
//                 "accountPlan":"Free",
//                 "links":[{
//                         "rel":"self",
//                         "href":"http://localhost:8080/users/1"
//                     },
//                     {
//                         "rel":"search",
//                         "href":"http://localhost:8080/companies?search"
//                     },
//                     {
//                         "rel":"myCompanies",
//                         "href":"http://localhost:8080/users/1/companies"
//                     },
//                     {
//                         "rel":"myCustomers",
//                         "href":"http://localhost:8080/users/1/customers"
//                     },
//                     {
//                         "rel":"myVendors",
//                         "href":"http://localhost:8080/users/1/vendors"
//                     }
//                 ]
//             });

//             expect(site.auth.loggedIn).toBe(false);
//             scope.register({"email": "wil@gm.co", "password": "something"});
//             $httpBackend.flush();
//             expect(site.selfUrl).toBe('http://localhost:8080/users/1');
//             expect(site.searchUrl).toBe('http://localhost:8080/companies?search');
//             expect(site.myCompaniesUrl).toBe('http://localhost:8080/users/1/companies');
//             expect(site.myCustomersUrl).toBe('http://localhost:8080/users/1/customers');
//             expect(site.myVendorsUrl).toBe('http://localhost:8080/users/1/vendors');
//             expect(site.auth.loggedIn).toBe(true);
//         });

//         it('should fail to register a user that already exists.', function() {
//             $httpBackend.expectPOST('http://localhost:8080/users').respond(409, {
//                 "title": "User Exists",
//                 "message": "User with the email userExists@somewhere.com already exits.",
//                 "statusCode": "409"
//             });

//             expect(site.auth.loggedIn).toBe(false);
//             scope.register({"email": "pootis", "password": ""});
//             $httpBackend.flush();
//             expect(site.auth.loggedIn).toBe(false);
//         });
//     });
// });