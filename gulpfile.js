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
        EJS   : 'source/public/**/*.ejs'
    },
    dest : {
        ALL   : 'build/',
        SERVE : 'build/',
        CSS   : 'build/public/css/',
        JS    : 'build/public/js/',
        EJS   : 'build/public/'
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
gulp.task('clean-ejs', function() {
    gulp
        .src(path.dest.EJS + '**/*.ejs', {read: false})
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
 * Copy EJS files over
 */
gulp.task('ejs', ['clean-ejs'], function() {
    return gulp
        .src(path.src.EJS)
        .pipe(gulp.dest(path.dest.EJS));
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

gulp.task('build-client', ['ejs', 'sass']);
gulp.task('build-server', ['scripts']);

gulp.task('build', ['build-client', 'build-server']);
gulp.task('default', ['build']);
