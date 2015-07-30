'use strict';

describe('card directive', function() {
    
    var $compile, scope;

    beforeEach(module('OBB.directives'));

    beforeEach(inject(function(_$compile_, $rootScope, $templateCache){
        $compile = _$compile_;
        scope = $rootScope.$new();
        $templateCache.put('partials/card.html', "<article></article>");
    }));

    it('should replace <card> with <article>', function() {
        var data = {test: 'test'};
        
        scope.card = data;
        
        var element = $compile('<div><card></card></div>')(scope);
        scope.$digest();
        
        expect(element.find('article').length).toBe(1);
    });
});