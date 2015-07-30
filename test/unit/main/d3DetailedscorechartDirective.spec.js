'use strict';

describe('D3 Detailed Chart Directive', function() {
    
    var scope, $compile, $window, $timeout, element;

    beforeEach(module('OBB'));
    
    beforeEach(inject(function(_$compile_, $rootScope, _$window_, $timeout) {
        $compile = _$compile_;
        scope = $rootScope.$new();
        $window = _$window_;
    }));

    it('should place a detailed score graph', function() {
        element = $compile(angular.element('<body><div d3-detailedscorechart data="score1" ></div ></body>'))(scope);
        scope.score1 = 55;
        
        //console.log(element);
        
        scope.$apply();
        scope.$digest();
        
        //scope.render(55);
       // console.log(element);
        
        //expect(element.find('article').length).toBe(1);
    });

});