var
    gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    clean = require('gulp-clean')
;

var path = {
    client : {
        src : {
            ALL  : 'client',
            SASS : 'client/sass/**/*.scss',
            HTML : 'client/**/*.html'
        },
        dest : {
            ALL  : 'build/public/',
            CSS  : 'build/public/css/',
            JS   : 'build/public/js/',
            HTML : 'build/public/'
        }
    },
    server : {
        src : {
            ALL : 'server'
        }
    }
}

/*
* Delete CSS from the build directory
*/
gulp.task('clean-css', function() {
    gulp
        .src(path.client.dest.CSS, {read: false})
        .pipe(clean());
});

/*
* Delete HTML from the build directory
*/
gulp.task('clean-html', function() {
    gulp
        .src(path.client.dest.HTML + '**/*.html', {read: false})
        .pipe(clean());
});

/*
* Delete the contents of the build directory
*/
gulp.task('clean', function() {
    gulp
        .src(path.client.dest.ALL, {read: false})
        .pipe(clean());
});

/*
 * Copy HTML files over
 */
gulp.task('html', ['clean-html'], function() {
    return gulp
        .src(path.client.src.HTML)
        .pipe(gulp.dest(path.client.dest.HTML));
});

/*
 * Convert SASS files to CSS
 */
gulp.task('sass', ['clean-css'], function() {
    return gulp
        .src(path.client.src.SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.client.dest.CSS));
});

gulp.task('build-client', ['html', 'sass']);

gulp.task('build', ['html', 'sass']);
gulp.task('default', ['build']);
