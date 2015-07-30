'use strict';

describe('TOS directive', function() {
    
    var $compile, scope;

    beforeEach(module('OBB.directives'));

    beforeEach(inject(function(_$compile_, $rootScope, $templateCache){
        $compile = _$compile_;
        scope = $rootScope.$new();
        $templateCache.put('partials/tos.html', "<div>bunch of legal jargon</div>");
    }));

    it('should replace <div tos> with a bunch of legal jargon', function() {
        
        var element = $compile('<div tos></div>')(scope);
        scope.$digest();
        
        expect(element.text()).toEqual("bunch of legal jargon");
    });
});