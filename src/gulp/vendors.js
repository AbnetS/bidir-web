var args = require('yargs').argv,
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gulpsync = $.sync(gulp),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    PluginError = $.util.PluginError,
    del = require('del'),
    karmaServer = require('karma').Server,
    protractor = $.protractor.protractor,
    webdriver = $.protractor.webdriver,
    express = require('express');


// production mode (see build task)
var isProduction = false;
// Switch to sass mode.
// Example:
//    gulp --usesass
var useSass = args.usesass;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// if sass -> switch to sass folder
if (useSass) {
    log('Using SASS stylesheets...');
    paths.styles = 'sass/';
}

var paths = {
    app: '../app/',
    markup: 'pug/',
    styles: 'less/',
    scripts: 'js/',
    e2e: 'e2e'
};

var build = {
    scripts: '../app/js',
    styles:  '../app/css',
    templates: {
        index: '../',
        views: '../app/',
        cache: '../app/js/' + 'templates.js'
    }
};
var cssnanoOpts = {
    safe: true,
    discardUnused: false, // no remove @font-face
    reduceIdents: false, // no change on @keyframes names
    zindex: false // no change z-index
}


// VENDOR CONFIG
var vendor = {
    // vendor scripts required to start the app
    base: {
        source: require('.././vendor.base.json'),
        js: 'base.js',
        css: 'base.css'
    },
    // vendor scripts to make the app work. Usually via lazy loading
    app: {
        source: require('.././vendor.json'),
        dest: '../vendor'
    }
};


// VENDOR BUILD
gulp.task('vendor', gulpsync.sync(['vendor:base', 'vendor:app']));

// Build the base script to start the application from vendor assets
gulp.task('vendor:base', function() {
    log('Copying base vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });

    return gulp.src(vendor.base.source)
        .pipe($.expectFile(vendor.base.source))
        .pipe(jsFilter)
        .pipe($.concat(vendor.base.js))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest(build.scripts))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.concat(vendor.base.css))
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(gulp.dest(build.styles))
        .pipe(cssFilter.restore)
        ;
});

// copy file from bower folder into the app vendor folder
gulp.task('vendor:app', function() {
    log('Copying vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });

    return gulp.src(vendor.app.source, {
        base: 'bower_components'
    })
        .pipe($.expectFile(vendor.app.source))
        .pipe(jsFilter)
        // .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(cssFilter.restore)
        .pipe(gulp.dest(vendor.app.dest));

});

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}