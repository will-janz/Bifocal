'use strict';

describe('CRE Join', function() {
    
    beforeEach(module('OBB'));
    
    var ctrl, scope, site, $httpBackend;
    
    beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_) {
        
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        site = Site;
        ctrl = $controller('CRE_JoinCtrl', {$scope: scope, Site: site});
    }));
    
    it('should set initial Site attributes', function() {
        expect(site.vertical).toEqual("CRE");
        expect(site.page).toEqual("join");
        expect(site.title).toEqual("Join");
    });
});