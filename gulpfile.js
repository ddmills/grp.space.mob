var
    gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    clean = require('gulp-clean')
;

var path = {
    src : {
        ALL  : 'app/public/',
        SASS : 'app/public/sass/**/*.scss',
        HTML : 'app/public/**/*.html'
    },
    dest : {
        ALL  : 'build/',
        CSS  : 'build/public/css/',
        HTML : 'build/public/'
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

gulp.task('build', ['html', 'sass']);
gulp.task('default', ['build']);
