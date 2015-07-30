'use strict';

// Shared vertical filters spec
// TODO: dependency injection is being handled sloppily; clean it up.

describe('Shared filters', function() {
    
    beforeEach(module('OBB.filters'));
    
    // Version interpolation
    describe('interpolate', function() {
        
        beforeEach(module(function($provide) {
            $provide.value('version', 'TEST_VER');
        }));
        
        it('should replace VERSION', inject(function(interpolateFilter) {
            expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
        }));
    });
    
    // Key Rating CSSifier
    describe('Key Rating CSSifier', function() {
        
        it('should change 4.5 into 4-5', inject(function(keyRatingFilter) {
            expect(keyRatingFilter('4.5')).toEqual('4-5');
        }));
        
        it('should not affect 4', inject(function(keyRatingFilter) {
            expect(keyRatingFilter('4')).toEqual('4');
        }));
        
        it('should be able to accept strings, integers, and decimals', inject(function(keyRatingFilter) {
            expect(keyRatingFilter('3.5')).toEqual('3-5');
            expect(keyRatingFilter(5)).toEqual('5');
            expect(keyRatingFilter(2.5)).toEqual('2-5');
        }));
    });
    
    // State mapper (CO -> Colorado)
    describe('State ID mapper', function() {
        var stateMapFilter;
        beforeEach(inject(function($filter) {
            stateMapFilter = $filter('stateMap');
        }));
        
        it('should take a state\'s two character ID and convert it to the state\'s full name', function() {
            expect(stateMapFilter('CO')).toEqual('COLORADO');
            expect(stateMapFilter('DC')).toEqual('DISTRICT OF COLUMBIA');
            expect(stateMapFilter('KS')).toEqual('KANSAS');
        });
        
        it('should return a blank (later to be a string of each state) for multiple states', function() {
            expect(stateMapFilter('CO, UT')).toEqual(' ');
            expect(stateMapFilter('DC, KS')).toEqual(' ');
            expect(stateMapFilter('CO, CO')).toEqual(' ');
        });
        
        it('should return a blank for everything else', function() {
            expect(stateMapFilter('NO')).toEqual(' ');
            expect(stateMapFilter('Beans')).toEqual(' ');
            expect(stateMapFilter('lolidkmybffjillomgwtfbbq9001')).toEqual(' ');
        });
        
    });
    // TODO
});