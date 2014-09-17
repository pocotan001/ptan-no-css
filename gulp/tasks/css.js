var argv    = require('minimist')(process.argv.slice(2)),
    gulp    = require('gulp'),
    gulpif  = require('gulp-if'),
    concat  = require('gulp-concat'),
    myth    = require('gulp-myth'),
    prefix  = require('gulp-autoprefixer'),
    header  = require('gulp-header'),
    csslint = require('gulp-csslint'),
    cssmin  = require('gulp-cssmin');

gulp.task('css', function() {
    var isProduction = argv.p || argv.production;

    gulp.src([
        './app/css/foundation/reset.css',
        './app/css/foundation/config.css',
        './app/css/foundation/base.css',
        './app/css/layout/*.css',
        './app/css/object/component/*.css',
        './app/css/object/project/*.css',
        './app/css/object/utility/*.css'
    ])
        .pipe(concat('app.css'))
        .pipe(myth())
        .pipe(prefix('last 1 version'))
        .pipe(header('@charset "utf-8";\n\n'))
        .pipe(csslint('.csslintrc'))
        .pipe(csslint.reporter())
        .pipe(gulpif(isProduction, cssmin()))
        .pipe(gulp.dest('./dist/'));
});
