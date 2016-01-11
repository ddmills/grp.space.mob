var
    gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    clean = require('gulp-clean'),
    debug = require('gulp-debug'),
    gutil = require('gulp-util'),
    child = require('child_process'),
    fs    = require('fs')
;

var SERVER = null;

var path = {
    src : {
        ALL   : 'source/',
        SERVE : 'source/serve.js',
        SASS  : 'source/public/sass/**/*.scss',
        EJS   : 'source/public/**/*.ejs',
        JS    : 'source/public/**/*.js',
        PACK  : 'source/package.json'
    },
    dest : {
        ALL   : 'build/',
        SERVE : 'build/',
        CSS   : 'build/public/css/',
        JS    : 'build/public/',
        EJS   : 'build/public/',
        PACK  : 'build/'
    }
}

/*
* Delete CSS from the build directory
*/
gulp.task('clean-css', function() {
    return gulp
        .src(path.dest.CSS, {read: false})
        .pipe(clean());
});

/*
* Delete HTML from the build directory
*/
gulp.task('clean-ejs', function() {
    return gulp
        .src(path.dest.EJS + '**/*.ejs', {read: false})
        .pipe(clean());
});

/*
* Delete JS from the build directory
*/
gulp.task('clean-js', function() {
    return gulp
        .src(path.dest.JS + '**/*.js', {read: false})
        .pipe(clean());
});

/*
* Delete package.json from the build directory
*/
gulp.task('clean-pack', function() {
    return gulp
        .src(path.dest.PACK + 'package.json', {read: false})
        .pipe(clean());
});

/*
* Delete the contents of the build directory
*/
gulp.task('clean', function() {
    return gulp
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
 * Copy JS files over
 */
gulp.task('js', ['clean-js'], function() {
    return gulp
        .src(path.src.JS)
        .pipe(gulp.dest(path.dest.JS));
});

/*
 * Copy package.json over
 */
gulp.task('pack', ['clean-pack'], function() {
    return gulp
        .src(path.src.PACK)
        .pipe(gulp.dest(path.dest.PACK));
});

/*
* Delete serve javascript from the build directory
*/
gulp.task('serve:clean', function() {
    return gulp
        .src(path.dest.SERVE + 'serve.js', {read: false})
        .pipe(clean());
});

/*
 * Watch for when JS, EJS, or SCSS files change so they can be updated
 */
gulp.task('watch', function() {
    gulp.watch(path.src.SERVE, ['serve:restart']);
    gulp.watch(path.src.EJS, ['ejs']);
    gulp.watch(path.src.SASS, ['sass']);
    gulp.watch(path.src.JS, ['js']);
});

/*
 * Build the server
 */
gulp.task('serve:build', ['serve:clean'], function() {
    return gulp
        .src(path.src.SERVE)
        .pipe(gulp.dest(path.dest.SERVE));
});

/*
 * Kill the node server
 */
gulp.task('serve:kill', function() {
    if (SERVER != null) SERVER.kill('SIGINT');
});

/*
 * Restart the node server
 */
gulp.task('serve:restart', ['serve:build', 'serve']);

/*
 * Start the node server
 */
gulp.task('serve', ['serve:build', 'serve:kill'], function() {
    SERVER = child.spawn('node', ['build/serve.js']);
    gutil.beep();
});

gulp.task('client:build', ['js', 'ejs', 'sass']);

gulp.task('build', ['client:build', 'serve:build']);
gulp.task('client', ['client:build']);
gulp.task('default', ['client', 'serve', 'watch']);

gulp.task('production', ['client', 'serve:build', 'pack']);
