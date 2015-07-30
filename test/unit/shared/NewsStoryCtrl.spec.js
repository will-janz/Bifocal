'use strict';

describe('News Story', function() {
    
    beforeEach(module('OBB'));
    
    var ctrl, scope, site, $httpBackend, location;
    
    beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_, $location) {
        
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        site = Site;
        location = $location;
        ctrl = $controller('NewsStoryCtrl', {$scope: scope, Site: site, $location: location, $routeParams: {story: 2}});
    }));
    
    it('should set initial Site attributes', function() {
        expect(site.vertical).toEqual("main");
        expect(site.page).toEqual("news");
        expect(site.title).toEqual("News");
    });
    
    it('should pull news stories and display one', function() {
        $httpBackend.expectGET('tempAPI/news.json').respond(200, [{elem1: "something"}, {elm2: "something"}]);
        location.path('/news/1');
        scope.$apply();
        expect(location.path()).toBe('/news/1');
        $httpBackend.flush();
        expect(scope.article).toBeDefined();
        expect(scope.articleCount).toBe(2);
    });
});