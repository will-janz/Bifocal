// karma test runner configuration for the CI build suite.

module.exports = function(config){
    config.set({
        basePath : '../',
        logLevel: config.LOG_DEBUG,
        frameworks: ['jasmine'],

        files : [
            'app/lib/jquery-1.10.2.min.js',
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'test/lib/angular/angular-mocks.js',
            'app/lib/underscore.js',
            'app/lib/**/*.js',
            'app/js/**/*.js',
            'app/verticals/**/*.js',
            'test/unit/**/*.js'
        ],

        browsers : ['PhantomJS'],
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors : {
            'app/js/**/*.js': ['coverage']
        },
        coverageReporter : {
            type: 'cobertura',
            dir: 'coverage/',
            file: 'coverage.xml'
        }
    })}