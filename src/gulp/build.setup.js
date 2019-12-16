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
// styles sourcemaps
var useSourceMaps = false;

// Switch to sass mode.
// Example:
//    gulp --usesass
var useSass = args.usesass;

// Angular template cache
// Example:
//    gulp --usecache
var useCache = args.usecache;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

var paths = {
    app: '../app/',
    markup: 'pug/',
    styles: 'less/',
    scripts: 'js/',
    e2e: 'e2e'
};

var buildSetup = {
    scripts: '../app/js',
    styles:  '../app/css',
    templates: {
        index: '../',
        views: '../app/',
        cache: '../app/js/' + 'templates.js'
    },
    vendor: {
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
    }
};

// SOURCES CONFIG
var source = {
    scripts: [paths.scripts + 'app.module.js',
        // template modules
        paths.scripts + 'modules/**/*.module.js',
        paths.scripts + 'modules/**/*.js',
        // custom modules
        paths.scripts + 'custom/**/*.module.js',
        paths.scripts + 'custom/**/*.js'
    ],
    templates: {
        index: [paths.markup + 'index.*'],
        views: [paths.markup + '**/*.*', '!' + paths.markup + 'index.*']
    },
    styles: {
        app: [paths.styles + '*.*'],
        themes: [paths.styles + 'themes/*'],
        watch: [paths.styles + '**/*', '!' + paths.styles + 'themes/*']
    }
};

// PLUGINS OPTIONS

var prettifyOpts = {
    indent_char: ' ',
    indent_size: 3,
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code']
};

var vendorUglifyOpts = {
    mangle: {
        except: ['$super'] // rickshaw requires this
    }
};

var tplCacheOptions = {
    root: 'app',
    filename: 'templates.js',
    //standalone: true,
    module: 'app.core',
    base: function(file) {
        return file.path.split('pug')[1];
    }
};

var injectOptions = {
    name: 'templates',
    transform: function(filepath) {
        return 'script(src=\'' +
            filepath.substr(filepath.indexOf('app')) +
            '\')';
    }
}

var cssnanoOpts = {
    safe: true,
    discardUnused: false, // no remove @font-face
    reduceIdents: false, // no change on @keyframes names
    zindex: false // no change z-index
}

//---------------
// TASKS
//---------------


// JS APP
gulp.task('scripts:app', function() {
    log('Building scripts..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.scripts)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat('app.js'))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        // .pipe($.if(isProduction, $.uglify({
        //     preserveComments: 'some'
        // })))
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(buildSetup.scripts))
        .pipe(reload({
            stream: true
        }));
});




// APP LESS
gulp.task('styles:app', function() {
    log('Building application styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.sass() : $.less())
        .on('error', handleError)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(buildSetup.styles))
        .pipe(reload({
            stream: true
        }));
});


// LESS THEMES
gulp.task('styles:themes', function() {
    log('Building application theme styles..');
    return gulp.src(source.styles.themes)
        .pipe(useSass ? $.sass() : $.less())
        .on('error', handleError)
        .pipe(gulp.dest(buildSetup.styles))
        .pipe(reload({
            stream: true
        }));
});

// PUG (ex JADE)
gulp.task('templates:index', ['templates:views'], function() {
    log('Building index..');

    var tplscript = gulp.src(buildSetup.templates.cache, {
        read: false
    });
    return gulp.src(source.templates.index)
        .pipe($.if(useCache, $.inject(tplscript, injectOptions))) // inject the templates.js into index
        .on('error', handleError)
        .pipe($.htmlPrettify(prettifyOpts))
        .pipe(gulp.dest(buildSetup.templates.index))
        .pipe(reload({
            stream: true
        }));
});

// PUG (ex JADE)
gulp.task('templates:views', function() {
    log('Building views.. ' + (useCache ? 'using cache' : ''));

    if (useCache) {

        return gulp.src(source.templates.views)
            .pipe($.angularTemplatecache(tplCacheOptions))
            .pipe($.if(isProduction, $.uglify({
                preserveComments: 'some',
                output: {
                    max_line_len: 120000 // cached html can reach default limit easily
                }
            })))
            .pipe(gulp.dest(buildSetup.scripts))
            .pipe(reload({
                stream: true
            }));
    } else {

        return gulp.src(source.templates.views)
            .pipe($.if(!isProduction, $.changed(buildSetup.templates.views, {
                extension: '.html'
            })))
            .on('error', handleError)
            .pipe($.htmlPrettify(prettifyOpts))
            .pipe(gulp.dest(buildSetup.templates.views))
            .pipe(reload({
                stream: true
            }));
    }
});

//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
    log('Watching source files..');

    gulp.watch(source.scripts, ['scripts:app']);
    gulp.watch(source.styles.watch, ['styles:app']);
    gulp.watch(source.styles.themes, ['styles:themes']);
    gulp.watch(source.templates.views, ['templates:views']);
    gulp.watch(source.templates.index, ['templates:index']);

});

// Serve files with auto reaload
gulp.task('browsersync', function() {
    log('Starting BrowserSync..');

    browserSync({
        notify: false,
        port: 5000,
        server: {
            baseDir: '..'
        },
        middleware: [require('connect-history-api-fallback')()]
    });

});

// lint javascript
gulp.task('lint', function() {
    return gulp
        .src(source.scripts)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

// Remove all files from the build paths
gulp.task('clean', function(done) {
    var delconfig = [].concat(
        buildSetup.styles,
        buildSetup.scripts,
        buildSetup.templates.index + 'index.html',
        buildSetup.templates.views + 'views',
        buildSetup.templates.views + 'pages',
        buildSetup.vendor.app.dest
    );

    log('Cleaning: ' + $.util.colors.blue(delconfig));
    // force: clean files outside current directory
    del(delconfig, {
        force: true
    }).then(function() { done(); });
});


/////////////////////

function done() {
    log('************');
    log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    log('************');
}

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}

function testServer(params) {

    var app = express();

    app.use(express.static(params.dir));

    return new Promise(function(res, rej) {
        var server = app.listen(params.port, function() {
            res(server)
        });
    });
}

function startKarmaTests(singleRun, done) {

    var excludeFiles = [];

    var server = new karmaServer({
        configFile: __dirname + '/tests/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    server.start();

    ////////////////

    function karmaCompleted(karmaResult) {
        log('Karma completed');

        if (karmaResult === 1) {
            done('\n********************************'+
                '\nkarma: tests failed with code ' + karmaResult +
                '\n********************************');
        } else {
            done();
        }
    }
}