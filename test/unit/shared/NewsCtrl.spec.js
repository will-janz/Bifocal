'use strict';

describe('News', function() {
    
    beforeEach(module('OBB'));
    
    var ctrl, scope, site, $httpBackend;
    
    beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_) {
        
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        site = Site;
        ctrl = $controller('NewsCtrl', {$scope: scope, Site: site});
    }));
    
    it('should set initial Site attributes', function() {
        expect(site.vertical).toEqual("main");
        expect(site.page).toEqual("news");
        expect(site.title).toEqual("News");
    });
    
    it('should pull news stories', function() {
        $httpBackend.expectGET('tempAPI/news.json').respond(200, ["elem1", "elm2"]);
        $httpBackend.flush();
        expect(scope.articles).toBeDefined();
    });
    
});