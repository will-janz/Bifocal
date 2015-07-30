// 'use strict';

// /* jasmine specs for controllers go here */
// describe('LoginCtrl', function() {

//     beforeEach(module('OBB'));

//     var scope;
//     var ctrl;
//     var $httpBackend;
//     var site;
//     var location;

//     beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, Site, $location) {
//         $httpBackend = _$httpBackend_;
//         scope = $rootScope.$new();
//         site = Site;
//         ctrl = $controller('LoginCtrl', {$scope: scope});
//         location = $location;
//     }));

//     it('should log a user in with valid credentials', function() {
//         var user = {"id":"1","email":"test@somewhere.com","level":"Newbie","companyId":"099099","accountPlan":"Account Plan 1","companies":[{"id":"1","name":"Test Company","registeredAgent":"Jane Doe","contact":{"address1":"121 First Street","address2":"suite A","city":"Denver","state":"CO","zip":"11111","phone":"(303)111-1111","pointOfContact":"JOhn Doe","website":"somewhere.com"},"status":"Status 1","stateId":"12345","industry":"Manufacturing","rating":{"thirty":{"good":1,"bad":2},"sixty":{"good":2,"bad":3},"ninety":{"good":4,"bad":5},"oneTwenty":{"good":6,"bad":7},"overall":75,"keys":7.0},"links":[{"rel":"remove","href":"http://localhost:8080/users/1/companies/1"},{"rel":"self","href":"http://localhost:8080/users/1/companies/1"},{"rel":"report","href":"http://localhost:8080/users/1/companies/1/report"}]},{"id":"1","name":"Test Company 2","registeredAgent":"Joe Dirt","contact":{"address1":"321 Second Street","address2":"suite b","city":"Denver","state":"CO","zip":"12111","phone":"(303)222-2222","pointOfContact":"JOhn Doe","website":"somewhere.com"},"status":"Status 2","stateId":"54321","industry":"Telecommunications","rating":{"thirty":{"good":7,"bad":6},"sixty":{"good":5,"bad":4},"ninety":{"good":3,"bad":2},"oneTwenty":{"good":1,"bad":0},"overall":91,"keys":9.0},"links":[{"rel":"remove","href":"http://localhost:8080/users/1/companies/1"},{"rel":"self","href":"http://localhost:8080/users/1/companies/1"},{"rel":"report","href":"http://localhost:8080/users/1/companies/1/report"}]}],"customers":[{"id":"1","name":"Test Company","registeredAgent":"Jane Doe","contact":{"address1":"121 First Street","address2":"suite A","city":"Denver","state":"CO","zip":"11111","phone":"(303)111-1111","pointOfContact":"JOhn Doe","website":"somewhere.com"},"status":"Status 1","stateId":"12345","industry":"Manufacturing","rating":{"thirty":{"good":1,"bad":2},"sixty":{"good":2,"bad":3},"ninety":{"good":4,"bad":5},"oneTwenty":{"good":6,"bad":7},"overall":75,"keys":7.0},"links":[{"rel":"remove","href":"http://localhost:8080/users/1/customers/1"},{"rel":"self","href":"http://localhost:8080/users/1/customers/1"},{"rel":"report","href":"http://localhost:8080/users/1/customers/1/report"}]},{"id":"1","name":"Test Company 2","registeredAgent":"Joe Dirt","contact":{"address1":"321 Second Street","address2":"suite b","city":"Denver","state":"CO","zip":"12111","phone":"(303)222-2222","pointOfContact":"JOhn Doe","website":"somewhere.com"},"status":"Status 2","stateId":"54321","industry":"Telecommunications","rating":{"thirty":{"good":7,"bad":6},"sixty":{"good":5,"bad":4},"ninety":{"good":3,"bad":2},"oneTwenty":{"good":1,"bad":0},"overall":91,"keys":9.0},"links":[{"rel":"remove","href":"http://localhost:8080/users/1/customers/1"},{"rel":"self","href":"http://localhost:8080/users/1/customers/1"},{"rel":"report","href":"http://localhost:8080/users/1/customers/1/report"}]}],"vendors":[{"id":"1","name":"Test Company","registeredAgent":"Jane Doe","contact":{"address1":"121 First Street","address2":"suite A","city":"Denver","state":"CO","zip":"11111","phone":"(303)111-1111","pointOfContact":"JOhn Doe","website":"somewhere.com"},"status":"Status 1","stateId":"12345","industry":"Manufacturing","rating":{"thirty":{"good":1,"bad":2},"sixty":{"good":2,"bad":3},"ninety":{"good":4,"bad":5},"oneTwenty":{"good":6,"bad":7},"overall":75,"keys":7.0},"links":[{"rel":"remove","href":"http://localhost:8080/users/1/vendors/1"},{"rel":"self","href":"http://localhost:8080/users/1/vendors/1"},{"rel":"report","href":"http://localhost:8080/users/1/vendors/1/report"}]},{"id":"1","name":"Test Company 2","registeredAgent":"Joe Dirt","contact":{"address1":"321 Second Street","address2":"suite b","city":"Denver","state":"CO","zip":"12111","phone":"(303)222-2222","pointOfContact":"JOhn Doe","website":"somewhere.com"},"status":"Status 2","stateId":"54321","industry":"Telecommunications","rating":{"thirty":{"good":7,"bad":6},"sixty":{"good":5,"bad":4},"ninety":{"good":3,"bad":2},"oneTwenty":{"good":1,"bad":0},"overall":91,"keys":9.0},"links":[{"rel":"remove","href":"http://localhost:8080/users/1/vendors/1"},{"rel":"self","href":"http://localhost:8080/users/1/vendors/1"},{"rel":"report","href":"http://localhost:8080/users/1/vendors/1/report"}]}],"links":[{"rel":"self","href":"http://localhost:8080/users/1"},{"rel":"search","href":"http://localhost:8080/companies?search"},{"rel":"myCompanies","href":"http://localhost:8080/users/1/companies"},{"rel":"myCustomers","href":"http://localhost:8080/users/1/customers"},{"rel":"myVendors","href":"http://localhost:8080/users/1/vendors"}]};

//         $httpBackend.expectGET('http://localhost:8080/user').respond(200, user);

//         expect(site.auth.loggedIn).toBe(false);
//         scope.login({"email": "test@somewhere.com", "password": "pwd"});
//         $httpBackend.flush();
//         expect(site.auth.loggedIn).toBe(true);
//         expect(site.selfUrl).toBe('http://localhost:8080/users/1');
//         expect(site.myCompaniesUrl).toBe('http://localhost:8080/users/1/companies');
//         expect(site.myCustomersUrl).toBe('http://localhost:8080/users/1/customers');
//         expect(site.myVendorsUrl).toBe('http://localhost:8080/users/1/vendors');
//         expect(site.credentials).toBe('dGVzdEBzb21ld2hlcmUuY29tOnB3ZA==');
//     });

//     it('should fail to log a user in with bad info', function() {
//         $httpBackend.expectGET('http://localhost:8080/user').
//             respond(401, 'Credentials are required to view this resource.');

//         expect(site.auth.loggedIn).toBe(false);
//         scope.login({"email": "pootis", "password": ""});
//         $httpBackend.flush();
//         expect(site.auth.loggedIn).toBe(false);
//     });

//     it('should redirect when backend gives error code other than 401', function(){
//         $httpBackend.expectGET('http://localhost:8080/user').respond(500, {});
//         scope.login({"email": "test", "password": "user"});
//         $httpBackend.flush();
//         expect(location.path()).toBe('/error');
//     });
// });