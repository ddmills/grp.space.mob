var
    gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    clean = require('gulp-clean')
;

var path = {
    src : {
        ALL   : 'source/',
        SERVE : 'source/serve.js',
        SASS  : 'source/public/sass/**/*.scss',
        HTML  : 'source/public/**/*.html'
    },
    dest : {
        ALL   : 'build/',
        SERVE : 'build/',
        CSS   : 'build/public/css/',
        JS    : 'build/public/js/',
        HTML  : 'build/public/'
    }
}

/*
* Delete CSS from the build directory
*/
gulp.task('clean-css', function() {
    gulp
        .src(path.dest.CSS, {read: false})
        .pipe(clean());
});

/*
* Delete HTML from the build directory
*/
gulp.task('clean-html', function() {
    gulp
        .src(path.dest.HTML + '**/*.html', {read: false})
        .pipe(clean());
});

/*
* Delete the contents of the build directory
*/
gulp.task('clean', function() {
    gulp
        .src(path.dest.ALL, {read: false})
        .pipe(clean());
});

/*
 * Copy HTML files over
 */
gulp.task('html', ['clean-html'], function() {
    return gulp
        .src(path.src.HTML)
        .pipe(gulp.dest(path.dest.HTML));
});

/*
 * Convert SASS files to CSS
 */
gulp.task('sass', ['clean-css'], function() {
    return gulp
        .src(path.src.SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dest.CSS));
});

/*
* Delete javascript from the build directory
*/
gulp.task('clean-scripts', function() {
    gulp
        .src(path.dest.ALL + 'serve.js', {read: false})
        .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function() {
    return gulp
        .src(path.src.SERVE)
        .pipe(gulp.dest(path.dest.SERVE));
});

gulp.task('build-client', ['html', 'sass']);
gulp.task('build-server', ['scripts']);

gulp.task('build', ['build-client', 'build-server']);
gulp.task('default', ['build']);
