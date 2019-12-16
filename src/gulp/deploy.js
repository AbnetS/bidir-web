'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var path = require('path');
var gulpNgConfig = require('gulp-ng-config');

var dir = path.join(conf.paths.config);

gulp.task('generateDevelopmentLocalConfig', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('app.common', {
            createModule: false,
            wrap: true,
            environment: ['env.development.local', 'global']
        }))
        .pipe(gulp.dest(dir));
});

gulp.task('generateDevelopmentPublicConfig', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('app.common', {
            createModule: false,
            wrap: true,
            environment: ['env.development.public', 'global']
        }))
        .pipe(gulp.dest(dir));
});

gulp.task('generateBurundiPublicConfig', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('app.common', {
            environment: ['env.burundi.public', 'global']
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, '/js/')));
});

gulp.task('generateBurundiLocalConfig', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('app.common', {
            environment: ['env.burundi.local', 'global']
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, '/js/')));
});