'use strict';

describe('D3 Simple Chart Directive', function() {
    
    var scope, $compile, $window, $timeout, d3service;

    beforeEach(module('OBB.directives'));
    
    beforeEach(inject(function(_$compile_, $rootScope){
        $compile = _$compile_;
        scope = $rootScope.$new();
    }));

    xit('should place a simple score graph', function() {
        var element = $compile('<d3-simplescorechart data="score2"></d3-simplescorechart>')(scope);
        
        
        scope.$digest();
        
        //expect(element.find('article').length).toBe(1);
    });

});