var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var server = require('gulp-webserver');

var data = require("./src/data/data.json");

gulp.task('css', function() {
    gulp.src("src/css/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest("build/css"));
});

gulp.task("copycss", function() {
    gulp.src("src/css*.css")
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

gulp.task("copyimg", function() {
    gulp.src("src/img/*.{png,jpg}")
        .pipe(gulp.dest("build/img"))
});

gulp.task("copyfonts", function() {
    gulp.src("src/fonts/*")
        .pipe(gulp.dest("build/fonts"))
});

//监听
gulp.task("watch", function() {
    gulp.watch("src/*.html", ["htmlmin"])
    gulp.watch("src/css/*.css", ["css"])
    gulp.watch("src/js/*.js", ["js"])
});

//起服务
gulp.task("server", ["css", "copycss", "js", "htmlmin", "copyimg", "copyfonts", "watch"], function() {
    gulp.src("build")
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === "/data") {
                    res.end(JSON.stringify(data))
                }
                next();
            }
        }))
});

gulp.task("default", ["server"]);