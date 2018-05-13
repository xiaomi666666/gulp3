var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

gulp.task('css', function() {
    gulp.src("src/css/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest("build/css"));
});

gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest("build/js"));
});

var options = {
    removeComments: true,
    collapseWhitespace: true
}
gulp.task("htmlmin", function() {
    gulp.src("src/*.html")
        .pipe(htmlmin(options))
        .pipe(gulp.dest("build"))
});