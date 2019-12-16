var  gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gulpsync = $.sync(gulp),
    protractor = $.protractor.protractor,
    webdriver = $.protractor.webdriver;

var buildSetup = require('./build.setup');
//---------------
// MAIN TASKS
//---------------

// build for production (minify)
gulp.task('build', gulpsync.sync([
    'generateDevelopmentPublicConfig',
    'clean',
    'prod',
    'vendor',
    'assets'
]));
//Build Ethiopia Production
gulp.task('build:production', gulpsync.sync([
    'generateDevelopmentLocalConfig',
    'build'
]));
//Build Burundi
gulp.task('build:burundiProduction', gulpsync.sync([
    'generateBurundiPublicConfig',
    'build'
]));
gulp.task('build:burundiLocal', gulpsync.sync([
    'generateBurundiLocalConfig',
    'build'
]));



gulp.task('prod', function() {
    log('Starting production build...');
    isProduction = true;
});

// Server for development
gulp.task('serve', gulpsync.sync([
    'generateDevelopmentPublicConfig',
    'default',
    'browsersync'
]), done);

// Server for production
gulp.task('serve-prod', gulpsync.sync([
    'build',
    'browsersync'
]), done);

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function() {
    useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
    'vendor',
    'assets',
    'watch'
]));

gulp.task('assets', [
    'scripts:app',
    'styles:app',
    'styles:themes',
    'templates:index',
    'templates:views'
]);

/// Testing tasks

gulp.task('test:unit', function(done) {
    startKarmaTests(true, done);
});

gulp.task('webdriver', webdriver);
gulp.task('test:e2e', ['webdriver'], function(cb) {

    var testFiles = gulp.src('test/e2e/**/*.js');

    testServer({
        port: '4444',
        dir: './app/'
    }).then(function(server) {
        testFiles.pipe(protractor({
            configFile: 'tests/protractor.conf.js',
        })).on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        }).on('end', function() {
            server.close(cb)
        });
    });

});

gulp.task('test', ['test:unit', 'test:e2e']);


function done() {
    log('************');
    log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    log('************');
}


// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}