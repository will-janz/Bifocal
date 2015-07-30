/*
 * Karma test coverage generator
 * configured to run a test once
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
            'test/lib/angular/angular-mocks.js',
            'app/lib/underscore.js',
            'app/lib/angular-underscore.js',
            'app/lib/angular-growl.js',
            'app/js/**/*.js',
            'app/verticals/**/*.js',
            'test/unit/**/*.js'
        ],

        exclude : [
        ],
        
        logLevel: config.LOG_DEBUG,

        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors : {
            'app/js/**/*.js': ['coverage'],
            'app/verticals/**/*.js': ['coverage']
        },
        
        junitReporter : {
          outputFile: 'test_out/unit.xml',
          suite: 'unit'
        }
    });
};
