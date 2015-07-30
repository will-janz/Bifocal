/*
 * Karma ongoing development testing
 * configured to watch files ad re-run tests during development
 */

module.exports = function(config) {
    config.set({
        
        basePath : '../',
        frameworks: ['jasmine'],
        browsers : ['PhantomJS'],
        
        files : [
            'app/lib/jquery-1.10.2.min.js',
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'app/lib/angular-growl.js',
            'app/lib/underscore.js',
            'app/lib/angular-underscore.js',
            'app/lib/d3.v3.min.js',
            'app/js/**/*.js',
            'app/verticals/**/*.js',
            'test/lib/angular/angular-mocks.js',
            'test/unit/**/*.js'
        ],
        
        exclude : [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js',
            'test/unit/CtrlTemplate.spec.js'
        ],
        
        autoWatch : true,
        
        
        
        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],
        
        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
        
    });
};
