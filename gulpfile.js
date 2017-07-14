'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var replace = require('gulp-replace');
var usemin = require('gulp-usemin');
var autoprefixer = require('gulp-autoprefixer');
var image = require('gulp-image');





// include js before dev 
var thirdPartyJS = [

    // Start : include plugins JS  //
    './dev/assets/plugins/jquery/jquery-1.12.0.min.js',
    './dev/assets/plugins/bootstrap/js/bootstrap.min.js',
//    './dev/assets/plugins/bootstrap-off-canvas-nav/js/bootstrap-off-canvas-nav.min.js',
//    './dev/assets/plugins/flexslider/jquery.flexslider-min.js',
//    './dev/assets/plugins/lightslilder-master/js/lightslider.min.js',
//    './dev/assets/plugins/lightGallery-master/js/lightgallery.min.js',
//    './dev/assets/plugins/lightGallery-master/js/lg-thumbnail.min.js',
//    './dev/assets/plugins/lightGallery-master/js/lg-fullscreen.min.js',
//    './dev/assets/plugins/ScrollToFixed-master/jquery-scrolltofixed-min.js',    
     // End : include plugins JS //
     // Start : include Custom JS //
    './dev/assets/js/custom.js'
     // End : include Custom JS //

],
    // include css before dev
    thirdPartyCSS = [
    // Start : include plugins CSS  //
//    './dev/assets/plugins/bootstrap/css/bootstrap.min.css',
//    './dev/assets/plugins/fullPage.js-master/jquery.fullPage.css',
//    './dev/assets/plugins/bootstrap-off-canvas-nav/css/bootstrap-off-canvas-nav.css',
//    './assets/fonts/font-awesome.min.css',    
//    '..assets/fonts/stylesheet.css',
//    './dev/assets/plugins/flexslider/flexslider.css',
//    './dev/assets/plugins/imagehover.css-master/css/imagehover.min.css',
//    './dev/assets/plugins/lightslider-master/css/lightslider.min.css',
//    './dev/assets/plugins/lightGallery-master/css/lightgallery.min.css',
    // End : include plugins CSS //

    // Start : include Custom CSS //
    './dev/assets/css/custom.css'
    // End : include Custom CSS //


];

// Create Task : Convert SASS TO CSS //
gulp.task('sass', function () {
    return gulp.src('dev/assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dev/assets/css'));
});

// Create Task : Combine & Minify CSS //
gulp.task('build-css', function () {
    return gulp.src(thirdPartyCSS) // Combine All CSS 
        .pipe(concat('custom.min.css'))
//        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'));

});
// Create Task : Combine & Minify CSS //
gulp.task('sass-css', function () {
    return gulp.src(thirdPartyCSS) // Combine All CSS 
        .pipe(concat('custom.css'))        
        .pipe(gulp.dest('dev/assets/css'));

});

// Create Task : Combine & Minify Javascript //
gulp.task('build-js', function () {
    return gulp.src(thirdPartyJS) // Combine All JS 
        .pipe(concat('custom.min.js'))
        .pipe(uglify('compress'))
        .pipe(gulp.dest('assets/js'));
});
// End Task : Combine & Minify Javascript //


// Create Task : Optimize Images //
gulp.task('imgOptimize', function () {
    gulp.src('assets/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 12
        }))
        .pipe(gulp.dest('assets/images'));
});

// End Task : Optimize Images //
// Create Task : Clean CSS Files //
//gulp.task('clean', function() {
//  return gulp.src(['assets/scss/*.css'],{ read:false })
//    .pipe(rimraf({ force: true }));
//});

gulp.task('default', ['sass','build-js', 'build-css'], function () {
    gulp.watch("dev/assets/scss/**/*.scss", ['sass']);
    gulp.watch("dev/assets/css/**/*.css", ['build-css']);
    gulp.watch("dev/assets/js/**/*.js", ['build-js']);

});

gulp.task('build-all', ['sass', 'imgOptimize', 'build-js', 'build-css'], function () {
    
});
