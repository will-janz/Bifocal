'use strict';

describe('CRE Buy', function() {
    
    beforeEach(module('OBB'));
    
    var ctrl, scope, site, $httpBackend;
    
    beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_) {
        
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        site = Site;
        ctrl = $controller('CRE_BuyCtrl', {$scope: scope, Site: site});
    }));
    
    it('should set initial Site attributes', function() {
        expect(site.vertical).toEqual("CRE");
        expect(site.page).toEqual("buy");
        expect(site.title).toEqual("Buy Now");
    });
});