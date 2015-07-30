'use strict';

describe('CRE Testimonials', function() {
    
    beforeEach(module('OBB'));
    
    var ctrl, scope, site, $httpBackend;
    
    beforeEach(inject(function($rootScope, $controller, Site, _$httpBackend_) {
        
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        site = Site;
        ctrl = $controller('CRE_TestimonialsCtrl', {$scope: scope, Site: site});
    }));
    
    it('should set initial Site attributes', function() {
        expect(site.vertical).toEqual("CRE");
        expect(site.page).toEqual("testimonials");
        expect(site.title).toEqual("Testimonials");
    });
});