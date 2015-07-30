'use strict';

describe('Contact', function() {
    
    beforeEach(module('OBB'));
    
    var ctrl, scope, site, $httpBackend;
    
    beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_) {
        
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        site = Site;
        ctrl = $controller('ContactCtrl', {$scope: scope, Site: site});
    }));
    
    it('should set initial Site attributes', function() {
        expect(site.vertical).toEqual("main");
        expect(site.page).toEqual("contact");
        expect(site.title).toEqual("Contact Ben");
    });
    
    
});